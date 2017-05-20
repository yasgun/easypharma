Meteor.publish('users', function () {
    return Meteor.users.find({});
});

Meteor.publish('medicines', function () {
    return Medicines.find({});
});

Meteor.publish('stock_medicines', function () {
    return StockMedicines.find({});
});

Meteor.publish('customer_bill_records', function () {
    return CustomerBillRecords.find({});
});

Meteor.publish('customer_bills', function () {
    return CustomerBills.find({});
});

Meteor.publish('stock_bill_records', function () {
    return StockBillRecords.find({});
});

Meteor.publish('daily_reports', function () {
    return DailyReports.find({});
});

Meteor.publish('api_users', function () {
    return APIUsers.find({});
});