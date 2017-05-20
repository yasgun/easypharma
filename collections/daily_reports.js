DailyReports = new Mongo.Collection('daily_reports');

DailyReportsSchema = new SimpleSchema({
    date: {
        type: Date,
        label: "date"
    },
    user_id: {
        type: String,
        label: "user_id"
    },
    total_amount_received: {
        type: Number,
        decimal: true,
        min: 0,
        label: "total_amount_received"
    },
    total_amount_paid: {
        type: Number,
        decimal: true,
        min: 0,
        label: "total_amount_paid"
    }
});

DailyReports.attachSchema(DailyReportsSchema);