Template.customer_bill.helpers({
    bill: () => {
        return CustomerBills.findOne({_id: Template.instance().data.customer_bill_id});
    },

    bill_records: () => {
        return CustomerBillRecords.find({
            _id: {
                $in: CustomerBills.findOne({_id: Template.instance().data.customer_bill_id}, {fields: {'customer_bill_record_ids': 1}}).customer_bill_record_ids
            }
        })
    }
});

Template.customer_bill.events({
    'click #close_button': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'view_reports',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'view-reports'
            }
        });
    }
});