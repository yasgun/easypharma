CustomerBills = new Mongo.Collection('customer_bills');

CustomerBillsSchema = new SimpleSchema({
    user_id: {
        type: String,
        label: "user_id"
    },
    date: {
        type: Date,
        label: "date"
    },
    total: {
        type: Number,
        decimal: true,
        min: 0,
        label: "total"
    },
    completed: {
        type: Boolean,
        label: "completed"
    },
    customer_bill_record_ids: {
        type: [String],
        label: "customer_bill_record_ids"
    }
});

CustomerBills.attachSchema(CustomerBillsSchema);