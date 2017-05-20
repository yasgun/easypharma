Template.customer_service.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('medicines');
        self.subscribe('stock_medicines');
        self.subscribe('customer_bill_records');
        self.subscribe('customer_bills');
    });

    self.medicine_color = new ReactiveDict();

    self.medicine_color.set("search_update_stocks_medicine_green", false);
    self.medicine_color.set("search_update_stocks_medicine_yellow", false);
    self.medicine_color.set("search_update_stocks_medicine_blue", false);
    self.medicine_color.set("search_update_stocks_medicine_all", true);

    self.add_medicine_color = new ReactiveDict();

    self.add_medicine_color.set("add_medicine_green", true);
    self.add_medicine_color.set("add_medicine_yellow", false);
    self.add_medicine_color.set("add_medicine_blue", false);

    self.input_search = new ReactiveVar("");

});

Template.customer_service.helpers({
    medicines: () => {
        let color = null;

        if (Template.instance().medicine_color.get("search_update_stocks_medicine_green")) {
            color = 'green';
        }
        if (Template.instance().medicine_color.get("search_update_stocks_medicine_yellow")) {
            color = 'yellow';
        }
        if (Template.instance().medicine_color.get("search_update_stocks_medicine_blue")) {
            color = 'blue';
        }

        if (Template.instance().medicine_color.get("search_update_stocks_medicine_all")) {
            const medicine_ids = StockMedicines.find({
                user_id: Meteor.userId(), active: true
            }).map(function (medicine) {
                return medicine.medicine_id;
            });

            return Medicines.find({
                _id: {$in: medicine_ids},
                $or: [
                    {general_name: {$regex: Template.instance().input_search.get()}},
                    {scientific_name: {$regex: Template.instance().input_search.get()}},
                ]
            }, {
                fields: {'_id': 1}
            });
        }


        const medicine_ids = StockMedicines.find({
            color: color, user_id: Meteor.userId(), active: true
        }).map(function (medicine) {
            return medicine.medicine_id;
        });

        return Medicines.find({
            _id: {$in: medicine_ids},
            $or: [
                {general_name: {$regex: Template.instance().input_search.get()}},
                {scientific_name: {$regex: Template.instance().input_search.get()}},
            ]
        }, {
            fields: {'_id': 1}
        });
    },

    search_update_stocks_medicine_green: () => {
        return Template.instance().medicine_color.get("search_update_stocks_medicine_green");
    },

    search_update_stocks_medicine_yellow: () => {
        return Template.instance().medicine_color.get("search_update_stocks_medicine_yellow");
    },

    search_update_stocks_medicine_blue: () => {
        return Template.instance().medicine_color.get("search_update_stocks_medicine_blue");
    },

    search_update_stocks_medicine_all: () => {
        return Template.instance().medicine_color.get("search_update_stocks_medicine_all");
    },

});

Template.customer_service.events({
    'click #search_update_stocks_medicine_green_btn': function (event, template) {
        event.preventDefault();

        template.medicine_color.set("search_update_stocks_medicine_green", true);
        template.medicine_color.set("search_update_stocks_medicine_yellow", false);
        template.medicine_color.set("search_update_stocks_medicine_blue", false);
        template.medicine_color.set("search_update_stocks_medicine_all", false);
    },

    'click #search_update_stocks_medicine_yellow_btn': function (event, template) {
        event.preventDefault();

        template.medicine_color.set("search_update_stocks_medicine_green", false);
        template.medicine_color.set("search_update_stocks_medicine_yellow", true);
        template.medicine_color.set("search_update_stocks_medicine_blue", false);
        template.medicine_color.set("search_update_stocks_medicine_all", false);
    },

    'click #search_update_stocks_medicine_blue_btn': function (event, template) {
        event.preventDefault();

        template.medicine_color.set("search_update_stocks_medicine_green", false);
        template.medicine_color.set("search_update_stocks_medicine_yellow", false);
        template.medicine_color.set("search_update_stocks_medicine_blue", true);
        template.medicine_color.set("search_update_stocks_medicine_all", false);
    },

    'click #search_update_stocks_medicine_all_btn': function (event, template) {
        event.preventDefault();

        template.medicine_color.set("search_update_stocks_medicine_green", false);
        template.medicine_color.set("search_update_stocks_medicine_yellow", false);
        template.medicine_color.set("search_update_stocks_medicine_blue", false);
        template.medicine_color.set("search_update_stocks_medicine_all", true);
    },

    'click #search_btn': function (event, template) {
        event.preventDefault();

        template.input_search.set(document.getElementById("inputSearch").value);
    }
});