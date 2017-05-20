Template.sign_in.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        const emailVar = event.target.signInEmail.value;
        const passwordVar = event.target.signInPassword.value;

        Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
            $('#submit').attr("disabled", false);
            if (err !== undefined) {

                $('#email_div').addClass('has-error');
                $('#password_div').addClass('has-error');
                $('#helper_text').html(error.reason + '. Sign in again!');

                event.target.signInEmail.value = "";
                event.target.signInPassword.value = "";

                $('#signInEmail').focus();

            } else {

                if (!Roles.userIsInRole(Meteor.userId(), 'active')) {
                    return Router.go('account-deactivated');
                }
                if (Roles.userIsInRole(Meteor.userId(), 'pharmacist')) {
                    return Router.go('customer-service');
                    // window.location.href = Meteor.absoluteUrl("customer-service");
                }
                if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                    return Router.go('user-management');
                    // window.location.href = Meteor.absoluteUrl("user-management");
                }

            }

        });
    },

    'click #forgot_password': function (event) {
        event.preventDefault();

        return Router.go('forgot-password');
    }
});