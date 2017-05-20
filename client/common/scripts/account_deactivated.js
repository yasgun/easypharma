Template.account_deactivated.events({
    'click #logout': function (event) {
        event.preventDefault();

        $('#logout').attr("disabled", true);

        Meteor.logout(function (error) {
            if (error !== undefined) {
                $('#helper_text').html(error.reason);
                $('#logout').removeAttr("disabled");
            } else {
                return Router.go('sign-in');
            }
        });
    }
});