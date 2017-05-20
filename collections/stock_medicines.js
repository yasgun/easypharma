StockMedicines = new Mongo.Collection('stock_medicines');

StockMedicinesSchema = new SimpleSchema({
    medicine_id: {
        type: String,
        label: "medicine_id"
    },
    user_id: {
        type: String,
        label: "user_id"
    },
    active: {
        type: Boolean,
        label: "active"
    },
    color: {
        type: String,
        label: "color"
    },
    selling_price: {
        type: Number,
        decimal: true,
        min: 0,
        label: "unit_price"
    },
    alert_level: {
        type: Number,
        min: 0,
        label: "alert_level"
    },
    quantity: {
        type: Number,
        min: 0,
        label: "quantity"
    }
});

StockMedicines.attachSchema(StockMedicinesSchema);