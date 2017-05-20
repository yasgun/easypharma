Template.stock_bill.helpers({
    bill_record: () => {
        return StockBillRecords.findOne({_id: Template.instance().data.stock_bill_id});
    },

    medicine: () => {
        return Medicines.findOne({_id: StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {medicine_id: 1}}).medicine_id});
    },

    stock_medicine: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id});
    },

    medicine_green: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "green";
    },

    medicine_yellow: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "yellow";
    },

    medicine_blue: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "blue";
    },
});

Template.stock_bill.events({
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