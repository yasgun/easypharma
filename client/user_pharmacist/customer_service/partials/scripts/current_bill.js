Template.current_bill.helpers({
    bill: () => {
        return CustomerBills.findOne({user_id: Meteor.userId(), completed: false});
    },

    bill_records: () => {
        const current_bill = CustomerBills.findOne({user_id: Meteor.userId(), completed: false});

        if (current_bill) {
            return CustomerBillRecords.find({
                _id: {
                    $in: current_bill.customer_bill_record_ids
                }, user_id: Meteor.userId()
            });
        }
    }
});

Template.current_bill.events({
    'click #submit': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        Meteor.call('checkout_bill', function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {
                alert(error.reason);
                console.log("error in checkout_bill");
                console.log(error);
            } else {
                BlazeLayout.render('master_layout', {
                    content: 'customer_service',
                    side_bar_links: 'pharmacist_side_bar_links',
                    page: {
                        link: 'customer-service'
                    }
                });
            }
        });
    },

    'click #discard_btn': function (event) {
        event.preventDefault();

        Meteor.call('discard_bill', function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {
                alert(error.reason);
                console.log("error in discard_bill");
                console.log(error);
            } else {
                BlazeLayout.render('master_layout', {
                    content: 'customer_service',
                    side_bar_links: 'pharmacist_side_bar_links',
                    page: {
                        link: 'customer-service'
                    }
                });
            }
        });
    }
});