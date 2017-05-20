Template.reset_password.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        const passwordVar = event.target.newPassword.value;
        const confirmVar = event.target.confirmPassword.value;

        if (passwordVar === confirmVar) {
            Accounts.resetPassword(Router.current().params.query.token, passwordVar, function (error) {
                $('#submit').attr("disabled", false);
                if (error !== undefined) {

                    $('#password_div1').addClass('has-error');
                    $('#password_div2').addClass('has-error');
                    $('#helper_text').html(error.reason + '. Try again!');

                    event.target.newPassword.value = "";
                    event.target.confirmPassword.value = "";

                    $('#newPassword').focus();

                } else {

                    return Router.go('sign-in');

                }

            });
        } else {
            $('#helper_text').html('Entered passwords are not matching!');

            event.target.newPassword.value = "";
            event.target.confirmPassword.value = "";

            $('#submit').removeAttr("disabled");
        }
    },

    'click #back_to_sign_in': function (event) {
        event.preventDefault();

        return Router.go('sign-in');
    }
});