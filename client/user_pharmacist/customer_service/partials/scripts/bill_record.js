Template.bill_record.helpers({
    medicine: () => {
        return Medicines.findOne({
            _id: StockMedicines.findOne({
                _id: Template.instance().data.stock_medicine_id,
                user_id: Meteor.userId()
            }, {fields: {medicine_id: 1}}).medicine_id
        });
    }
});