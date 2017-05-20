Meteor.methods({
    add_bill_record: function (bill_record) {
        tx.start("add_bill_record");

        const current_bill = CustomerBills.findOne({user_id: Meteor.userId(), completed: false});

        const stock_medicine = StockMedicines.findOne({
            _id: bill_record.inputStockMedicineId,
            user_id: Meteor.userId()
        });

        if (stock_medicine.quantity >= bill_record.inputQuantity) {

            if (current_bill) {
                const bill_record_id = CustomerBillRecords.insert({
                    'stock_medicine_id': stock_medicine._id,
                    'user_id': Meteor.userId(),
                    'quantity': bill_record.inputQuantity,
                    'amount': (parseFloat(bill_record.inputQuantity) * parseFloat(stock_medicine.selling_price))
                }, {tx: true});

                StockMedicines.update({_id: stock_medicine._id}, {
                    $set: {
                        'quantity': (parseInt(stock_medicine.quantity) - parseInt(bill_record.inputQuantity))
                    }
                }, {tx: true});

                CustomerBills.update({_id: current_bill._id}, {
                    $set: {'total': (parseFloat(current_bill.total) + (parseFloat(bill_record.inputQuantity) * parseFloat(stock_medicine.selling_price)))},
                    $addToSet: {'customer_bill_record_ids': bill_record_id}
                }, {tx: true});

            } else {
                const bill_record_id = CustomerBillRecords.insert({
                    'stock_medicine_id': stock_medicine._id,
                    'user_id': Meteor.userId(),
                    'quantity': bill_record.inputQuantity,
                    'amount': (parseFloat(bill_record.inputQuantity) * parseFloat(stock_medicine.selling_price))
                }, {tx: true});

                StockMedicines.update({_id: stock_medicine._id}, {
                    $set: {
                        'quantity': (parseInt(stock_medicine.quantity) - parseInt(bill_record.inputQuantity))
                    }
                }, {tx: true});

                CustomerBills.insert({
                    'user_id': Meteor.userId(),
                    'date': new Date(),
                    'total': (parseFloat(stock_medicine.selling_price) * parseFloat(bill_record.inputQuantity)),
                    'completed': false,
                    'customer_bill_record_ids': [bill_record_id]
                }, {tx: true});
            }
        } else {
            throw new Meteor.Error(403, 'Error 403: Forbidden', 'Cannot accept requests that exceed available quantity');

        }

        tx.commit();
    },

    checkout_bill: function () {
        tx.start("checkout_bill");

        const customer_bill = CustomerBills.findOne({user_id: Meteor.userId(), completed: false});

        CustomerBills.update({_id: customer_bill._id}, {
            $set: {'completed': true}
        }, {tx: true});

        const daily_report = DailyReports.findOne({
            'user_id': Meteor.userId(),
            'date': moment().startOf('day').toDate()
        });

        if (daily_report) {
            DailyReports.update({_id: daily_report._id}, {
                $set: {'total_amount_received': (parseFloat(daily_report.total_amount_received) + parseFloat(customer_bill.total))}
            }, {tx: true});
        } else {
            DailyReports.insert({
                'date': moment().startOf('day').toDate(),
                'user_id': Meteor.userId(),
                'total_amount_received': customer_bill.total,
                'total_amount_paid': 0
            }, {tx: true});
        }

        tx.commit();
    },

    discard_bill: function () {
        tx.start("discard_bill");

        const current_bill = CustomerBills.findOne({user_id: Meteor.userId(), completed: false});

        for (let i = 0; i < current_bill.customer_bill_record_ids; i++) {
            const bill_record = CustomerBillRecords.findOne({
                _id: current_bill.customer_bill_record_ids[i],
                user_id: Meteor.userId()
            });

            const stock_medicine = StockMedicines.findOne({
                _id: bill_record.stock_medicine_id,
                user_id: Meteor.userId()
            });

            StockMedicines.update({_id: stock_medicine._id}, {
                $set: {
                    'quantity': (parseInt(stock_medicine.quantity) + parseInt(bill_record.quantity))
                }
            }, {tx: true});
        }

        CustomerBillRecords.remove({
            _id: {$in: current_bill.customer_bill_record_ids},
            user_id: Meteor.userId()
        }, {tx: true});
        CustomerBills.remove({user_id: Meteor.userId(), completed: false}, {tx: true});

        tx.commit();
    }

});