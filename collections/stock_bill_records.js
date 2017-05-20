StockBillRecords = new Mongo.Collection("stock_bill_records");

StockBillRecordsSchema = new SimpleSchema({
    stock_medicine_id: {
        type: String,
        label: "stock_medicine_id"
    },
    user_id: {
        type: String,
        label: "user_id"
    },
    date: {
        type: Date,
        label: "date"
    },
    quantity_in: {
        type: Number,
        min: 0,
        label: "quantity_in"
    },
    quantity_out: {
        type: Number,
        min: 0,
        label: "quantity_out"
    },
    amount_paid: {
        type: Number,
        decimal: true,
        min: 0,
        label: "amount_paid"
    },
    amount_received: {
        type: Number,
        decimal: true,
        min: 0,
        label: "amount_received"
    }
});

StockBillRecords.attachSchema(StockBillRecordsSchema);