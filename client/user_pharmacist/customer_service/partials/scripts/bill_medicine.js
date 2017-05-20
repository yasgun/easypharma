Template.bill_medicine.helpers({
    medicine: () => {
        return Medicines.findOne({_id: Template.instance().data._id});
    },

    stock_medicine: () => {
        return StockMedicines.findOne({
            medicine_id: Template.instance().data._id, user_id: Meteor.userId()
        });
    },
});

Template.bill_medicine.events({
    'click #medicine_record': function (event, template) {
        event.preventDefault();

        let medicine_id = null;
        let stock_medicine_id = null;

        if (template.data.medicine_id) {
            medicine_id = template.data.medicine_id;
            stock_medicine_id = template.data._id;
        } else {
            medicine_id = template.data._id;
            const stock_medicine = StockMedicines.findOne({medicine_id: template.data._id, user_id: Meteor.userId()});
            if (stock_medicine) {
                stock_medicine_id = stock_medicine._id;
            }
        }

        BlazeLayout.render('master_layout', {
            content: 'customer_service',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'customer-service'
            },
            bill_form: 'add_bill_record',
            bill_data: {
                medicine_id: medicine_id,
                stock_medicine_id: stock_medicine_id
            }
        });
    }
});