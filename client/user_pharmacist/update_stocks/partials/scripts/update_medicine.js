Template.update_medicine.onCreated(function () {
    const self = this;

    self.add_medicine_color = new ReactiveDict();

    self.add_medicine_color.set("add_medicine_green", true);
    self.add_medicine_color.set("add_medicine_yellow", false);
    self.add_medicine_color.set("add_medicine_blue", false);
});

Template.update_medicine.helpers({
    medicine: () => {
        return Medicines.findOne({_id: Template.instance().data.medicine_id});
    },
    stock_medicine: () => {
        return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id, user_id: Meteor.userId()});
    },

    update_medicine_green: () => {
        if (Template.instance().data.stock_medicine_id) {
            return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "green";
        }
        return Template.instance().add_medicine_color.get("add_medicine_green");
    },

    update_medicine_yellow: () => {
        if (Template.instance().data.stock_medicine_id) {
            return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "yellow";
        }
        return Template.instance().add_medicine_color.get("add_medicine_yellow");
    },

    update_medicine_blue: () => {
        if (Template.instance().data.stock_medicine_id) {
            return StockMedicines.findOne({_id: Template.instance().data.stock_medicine_id}, {fields: {'color': 1}}).color == "blue";
        }
        return Template.instance().add_medicine_color.get("add_medicine_blue");
    },
});

Template.update_medicine.events({
    'submit form': function (event, template) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let medicine = {};

        medicine.medicineId = Template.instance().data.medicine_id;
        medicine.stockMedicineId = Template.instance().data.stock_medicine_id;

        medicine.inputSellingPrice = event.target.inputSellingPrice.value;
        medicine.inputAlertLevel = event.target.inputAlertLevel.value;

        medicine.inputIntakeQuantity = event.target.inputIntakeQuantity.value;
        medicine.inputAmountPaid = event.target.inputAmountPaid.value;

        medicine.inputReturnedQuantity = event.target.inputReturnedQuantity.value;
        medicine.inputAmountReceived = event.target.inputAmountReceived.value;

        if (!template.data.stock_medicine_id) {
            if (template.add_medicine_color.get("add_medicine_green")) {
                medicine.inputColor = 'green';
            }
            if (template.add_medicine_color.get("add_medicine_yellow")) {
                medicine.inputColor = 'yellow';
            }
            if (template.add_medicine_color.get("add_medicine_blue")) {
                medicine.inputColor = 'blue';
            }
        }

        Meteor.call('update_medicine', medicine, function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {
                alert(error.reason);
                console.log("error in update_medicine");
                console.log(error);
            } else {
                BlazeLayout.render('master_layout', {
                    content: 'update_stocks',
                    side_bar_links: 'pharmacist_side_bar_links',
                    page: {
                        link: 'update-stocks'
                    },
                    medicine_form: 'add_medicine'
                });
            }
        });
    },

    'click #cancel_btn': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'update_stocks',
            side_bar_links: 'pharmacist_side_bar_links',
            page: {
                link: 'update-stocks'
            },
            medicine_form: 'add_medicine'
        });
    },

    'click #enable': function (event, template) {
        event.preventDefault();

        if (template.data.stock_medicine_id) {
            Meteor.call('enable_medicine', Template.instance().data.stock_medicine_id, function (error) {
                if (error !== undefined) {
                    console.log("error in enable_medicine");
                    console.log(error);
                }
            });
        }
    },

    'click #disable': function (event, template) {
        event.preventDefault();

        if (template.data.stock_medicine_id) {
            Meteor.call('disable_medicine', Template.instance().data.stock_medicine_id, function (error) {
                if (error !== undefined) {
                    console.log("error in disable_medicine");
                    console.log(error);
                }
            });
        }
    },
    'click #update_medicine_green_btn': function (event, template) {
        event.preventDefault();

        if (template.data.stock_medicine_id) {
            Meteor.call('change_color_to_green', Template.instance().data.stock_medicine_id, function (error) {
                if (error !== undefined) {
                    console.log("error in change_color_to_green");
                    console.log(error);
                }
            });
        } else {
            template.add_medicine_color.set("add_medicine_green", true);
            template.add_medicine_color.set("add_medicine_yellow", false);
            template.add_medicine_color.set("add_medicine_blue", false);
        }
    },
    'click #update_medicine_yellow_btn': function (event, template) {
        event.preventDefault();

        if (template.data.stock_medicine_id) {
            Meteor.call('change_color_to_yellow', Template.instance().data.stock_medicine_id, function (error) {
                if (error !== undefined) {
                    console.log("error in change_color_to_yellow");
                    console.log(error);
                }
            });
        } else {
            template.add_medicine_color.set("add_medicine_green", false);
            template.add_medicine_color.set("add_medicine_yellow", true);
            template.add_medicine_color.set("add_medicine_blue", false);
        }
    },
    'click #update_medicine_blue_btn': function (event, template) {
        event.preventDefault();

        if (template.data.stock_medicine_id) {
            Meteor.call('change_color_to_blue', Template.instance().data.stock_medicine_id, function (error) {
                if (error !== undefined) {
                    console.log("error in change_color_to_blue");
                    console.log(error);
                }
            });
        } else {
            template.add_medicine_color.set("add_medicine_green", false);
            template.add_medicine_color.set("add_medicine_yellow", false);
            template.add_medicine_color.set("add_medicine_blue", true);
        }
    }
});