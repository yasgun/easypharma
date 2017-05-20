Template.edit_api_user.helpers({
    api_user: () => {
        return APIUsers.findOne({_id: Template.instance().data.api_user_id});
    },

    free_subscription: () => {
        return (APIUsers.findOne({_id: Template.instance().data.api_user_id}).subscription == "free_subscription");
    },

    paid_subscription: () => {
        return (APIUsers.findOne({_id: Template.instance().data.api_user_id}).subscription == "paid_subscription");
    }
});

Template.edit_api_user.events({
    'submit form': function (event, template) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let api_user = {};

        api_user.inputUserId = template.data.api_user_id;
        api_user.inputEmail = event.target.inputEmail.value;

        api_user.inputAPIUserName = event.target.inputAPIUserName.value;
        api_user.inputAPIKey = event.target.inputAPIKey.value;
        api_user.inputAPISubscription = event.target.inputAPISubscription.value;


        Meteor.call('edit_api_user',
            api_user,
            function (error) {
                $('#submit').attr("disabled", false);

                if (error !== undefined) {
                    alert(error);
                    console.log('error in edit_api_user');
                    console.log(error);
                } else {
                    BlazeLayout.render('master_layout', {
                        content: 'api_management',
                        side_bar_links: 'admin_side_bar_links',
                        user_form: 'create_api_user',
                        page: {
                            link: 'api-management'
                        }
                    });
                }
            }
        );

    },

    'click #cancel_btn': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'api_management',
            side_bar_links: 'admin_side_bar_links',
            user_form: 'create_api_user',
            page: {
                link: 'api-management'
            }
        });
    },

    'click #enable': function (event) {
        event.preventDefault();

        Meteor.call('enable_api_user', Template.instance().data.api_user_id, function (error) {
            if (error !== undefined) {
                console.log("error in enable_api_user");
                console.log(error);
            }
        });
    },

    'click #disable': function (event) {
        event.preventDefault();

        Meteor.call('disable_api_user', Template.instance().data.api_user_id, function (error) {
            if (error !== undefined) {
                console.log("error in disable_api_user");
                console.log(error);
            }
        });
    }
});