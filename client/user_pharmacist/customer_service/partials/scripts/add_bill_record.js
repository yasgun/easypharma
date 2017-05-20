Template.add_bill_record.helpers({
    medicine: () => {
        return Medicines.findOne({_id: Template.instance().data.medicine_id});
    },

    stock_medicine: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id, user_id: Meteor.userId()});
    },

    medicine_green: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "green";
    },

    medicine_yellow: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "yellow";
    },

    medicine_blue: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "blue";
    }

});

Template.add_bill_record.events({
    'submit form': function (event, template) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let bill_record = {};

        bill_record.inputStockMedicineId = template.data.stock_medicine_id;
        bill_record.inputQuantity = event.target.inputQuantity.value;

        Meteor.call('add_bill_record', bill_record, function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {
                alert(error.reason);
                console.log('error in add_bill_record');
                console.log(error);
            } else {
                BlazeLayout.render('master_layout', {
                    content: 'customer_service',
                    side_bar_links: 'pharmacist_side_bar_links',
                    page: {
                        link: 'customer-service'
                    }
                });
            }
        });
    },
    'click #cancel_btn': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'customer_service',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'customer-service'
            }
        });
    }
});