Template.forgot_password.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        const emailVar = event.target.signInEmail.value;

        Accounts.forgotPassword({email: emailVar}, function (error) {
            $('#submit').attr("disabled", false);

            if (error !== undefined) {

                $('#email_div').addClass('has-error');
                $('#helper_text').html(error.reason + '. Enter email again!');

                event.target.signInEmail.value = "";

                $('#signInEmail').focus();

            } else {

                return Router.go('sign-in');

            }

        });
    },

    'click #back_to_sign_in': function (event) {
        event.preventDefault();

        return Router.go('sign-in');
    }
});