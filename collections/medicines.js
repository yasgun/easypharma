Medicines = new Mongo.Collection('medicines');

MedicinesSchema = new SimpleSchema({
    general_name: {
        type: String,
        label: "general_name",
        max: 12
    },
    scientific_name: {
        type: String,
        label: "scientific_name",
        max: 20
    },
    unit_name: {
        type: String,
        label: "unit_name"
    }
});

Medicines.attachSchema(MedicinesSchema);