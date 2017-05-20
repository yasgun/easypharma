Template.customer_bill_record.events({
    'click #customer_bill_record': function (event, template) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'view_reports',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'view-reports'
            },
            bill_view: 'customer_bill',
            bill_data: {
                customer_bill_id: template.data._id
            }
        });

    }
});