Template.stock_bill_record.events({
    'click #stock_bill_record': function (event, template) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'view_reports',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'view-reports'
            },
            bill_view: 'stock_bill',
            bill_data: {
                stock_bill_id: template.data._id,
                stock_medicine_id: template.data.stock_medicine_id
            }
        });

    }
});