Meteor.methods({
    add_medicine: function (medicine) {
        tx.start("add_medicine");

        const med_id = Medicines.insert({
            'general_name': medicine.inputGeneralName,
            'scientific_name': medicine.inputScientificName,
            'unit_name': medicine.inputUnitName
        }, {tx: true});

        const stock_med_id = StockMedicines.insert({
            'medicine_id': med_id,
            'user_id': Meteor.userId(),
            'active': true,
            'color': medicine.inputColor,
            'selling_price': medicine.inputSellingPrice,
            'alert_level': medicine.inputAlertLevel,
            'quantity': (parseInt(medicine.inputIntakeQuantity) - parseInt(medicine.inputReturnedQuantity))
        }, {tx: true});

        StockBillRecords.insert({
            'stock_medicine_id': stock_med_id,
            'user_id': Meteor.userId(),
            'date': new Date(),
            'quantity_in': medicine.inputIntakeQuantity,
            'quantity_out': medicine.inputReturnedQuantity,
            'amount_paid': medicine.inputAmountPaid,
            'amount_received': medicine.inputAmountReceived,
        }, {tx: true});

        const daily_report = DailyReports.findOne({
            'user_id': Meteor.userId(),
            'date': moment().startOf('day').toDate()
        });

        if (daily_report) {
            DailyReports.update({_id: daily_report._id}, {
                $set: {
                    'total_amount_received': (parseFloat(daily_report.total_amount_received) + parseFloat(medicine.inputAmountReceived)),
                    'total_amount_paid': (parseFloat(daily_report.total_amount_paid) + parseFloat(medicine.inputAmountPaid))
                }
            }, {tx: true});
        } else {
            DailyReports.insert({
                'date': moment().startOf('day').toDate(),
                'user_id': Meteor.userId(),
                'total_amount_received': medicine.inputAmountReceived,
                'total_amount_paid': medicine.inputAmountPaid
            }, {tx: true});
        }

        tx.commit();
    },

    update_medicine: function (medicine) {
        tx.start("update_medicine");

        let stock_med_id = medicine.stockMedicineId;

        if (stock_med_id) {
            const available_quantity = StockMedicines.findOne({_id: stock_med_id, user_id: Meteor.userId()}).quantity;
            StockMedicines.update(stock_med_id, {
                $set: {
                    'selling_price': medicine.inputSellingPrice,
                    'alert_level': medicine.inputAlertLevel,
                    'quantity': (parseInt(available_quantity) + (parseInt(medicine.inputIntakeQuantity) - parseInt(medicine.inputReturnedQuantity)))
                }
            }, {tx: true});
        } else {
            stock_med_id = StockMedicines.insert({
                'medicine_id': medicine.medicineId,
                'user_id': Meteor.userId(),
                'active': true,
                'color': medicine.inputColor,
                'selling_price': medicine.inputSellingPrice,
                'alert_level': medicine.inputAlertLevel,
                'quantity': (parseInt(medicine.inputIntakeQuantity) - parseInt(medicine.inputReturnedQuantity))
            }, {tx: true});
        }

        StockBillRecords.insert({
            'stock_medicine_id': stock_med_id,
            'user_id': Meteor.userId(),
            'date': new Date(),
            'quantity_in': medicine.inputIntakeQuantity,
            'quantity_out': medicine.inputReturnedQuantity,
            'amount_paid': medicine.inputAmountPaid,
            'amount_received': medicine.inputAmountReceived,
        }, {tx: true});

        const daily_report = DailyReports.findOne({
            'user_id': Meteor.userId(),
            'date': moment().startOf('day').toDate()
        });

        if (daily_report) {
            DailyReports.update({_id: daily_report._id}, {
                $set: {
                    'total_amount_received': (parseFloat(daily_report.total_amount_received) + parseFloat(medicine.inputAmountReceived)),
                    'total_amount_paid': (parseFloat(daily_report.total_amount_paid) + parseFloat(medicine.inputAmountPaid))
                }
            }, {tx: true});
        } else {
            DailyReports.insert({
                'date': moment().startOf('day').toDate(),
                'user_id': Meteor.userId(),
                'total_amount_received': medicine.inputAmountReceived,
                'total_amount_paid': medicine.inputAmountPaid
            }, {tx: true});
        }

        tx.commit();
    },

    enable_medicine: function (stock_medicine_id) {
        StockMedicines.update({_id: stock_medicine_id, user_id: Meteor.userId()}, {$set: {active: true}});
    },

    disable_medicine: function (stock_medicine_id) {
        StockMedicines.update({_id: stock_medicine_id, user_id: Meteor.userId()}, {$set: {active: false}});
    },

    change_color_to_green: function (stock_medicine_id) {
        StockMedicines.update({_id: stock_medicine_id, user_id: Meteor.userId()}, {$set: {color: "green"}});
    },

    change_color_to_yellow: function (stock_medicine_id) {
        StockMedicines.update({_id: stock_medicine_id, user_id: Meteor.userId()}, {$set: {color: "yellow"}});
    },

    change_color_to_blue: function (stock_medicine_id) {
        StockMedicines.update({_id: stock_medicine_id, user_id: Meteor.userId()}, {$set: {color: "blue"}});
    },
});