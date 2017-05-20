Template.add_medicine.onCreated(function () {
    const self = this;
    self.add_medicine_color = new ReactiveDict();

    self.add_medicine_color.set("add_medicine_green", true);
    self.add_medicine_color.set("add_medicine_yellow", false);
    self.add_medicine_color.set("add_medicine_blue", false);
});

Template.add_medicine.helpers({
    add_medicine_green: () => {
        return Template.instance().add_medicine_color.get("add_medicine_green");
    },

    add_medicine_yellow: () => {
        return Template.instance().add_medicine_color.get("add_medicine_yellow");
    },

    add_medicine_blue: () => {
        return Template.instance().add_medicine_color.get("add_medicine_blue");
    },

});

Template.add_medicine.events({
    'submit form': function (event, template) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let medicine = {};

        medicine.inputGeneralName = event.target.inputGeneralName.value;
        medicine.inputScientificName = event.target.inputScientificName.value;

        medicine.inputUnitName = event.target.inputUnitName.value;
        medicine.inputSellingPrice = event.target.inputSellingPrice.value;
        medicine.inputAlertLevel = event.target.inputAlertLevel.value;

        medicine.inputIntakeQuantity = event.target.inputIntakeQuantity.value;
        medicine.inputAmountPaid = event.target.inputAmountPaid.value;

        medicine.inputReturnedQuantity = event.target.inputReturnedQuantity.value;
        medicine.inputAmountReceived = event.target.inputAmountReceived.value;

        if (template.add_medicine_color.get("add_medicine_green")) {
            medicine.inputColor = 'green';
        }
        if (template.add_medicine_color.get("add_medicine_yellow")) {
            medicine.inputColor = 'yellow';
        }
        if (template.add_medicine_color.get("add_medicine_blue")) {
            medicine.inputColor = 'blue';
        }

        Meteor.call('add_medicine', medicine, function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {
                alert(error.reason);
                console.log("error in add_medicine");
                console.log(error);
            } else {
                event.target.inputGeneralName.value = "";
                event.target.inputScientificName.value = "";

                event.target.inputUnitName.value = "";
                event.target.inputSellingPrice.value = "";
                event.target.inputAlertLevel.value = "";

                event.target.inputIntakeQuantity.value = 0;
                event.target.inputAmountPaid.value = 0;

                event.target.inputReturnedQuantity.value = 0;
                event.target.inputAmountReceived.value = 0;
            }
        });
    },

    'click #add_medicine_green_btn': function (event, template) {
        event.preventDefault();

        template.add_medicine_color.set("add_medicine_green", true);
        template.add_medicine_color.set("add_medicine_yellow", false);
        template.add_medicine_color.set("add_medicine_blue", false);
    },

    'click #add_medicine_yellow_btn': function (event, template) {
        event.preventDefault();

        template.add_medicine_color.set("add_medicine_green", false);
        template.add_medicine_color.set("add_medicine_yellow", true);
        template.add_medicine_color.set("add_medicine_blue", false);
    },

    'click #add_medicine_blue_btn': function (event, template) {
        event.preventDefault();

        template.add_medicine_color.set("add_medicine_green", false);
        template.add_medicine_color.set("add_medicine_yellow", false);
        template.add_medicine_color.set("add_medicine_blue", true);
    },
});