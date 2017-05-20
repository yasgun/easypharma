CustomerBillRecords = new Mongo.Collection("customer_bill_records");

CustomerBillRecordsSchema = new SimpleSchema({
    stock_medicine_id: {
        type: String,
        label: "stock_medicine_id"
    },
    user_id: {
        type: String,
        label: "user_id"
    },
    quantity: {
        type: Number,
        min: 0,
        label: "quantity"
    },
    amount: {
        type: Number,
        decimal: true,
        min: 0,
        label: "amount"
    }
});

CustomerBillRecords.attachSchema(CustomerBillRecordsSchema);