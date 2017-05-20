Template.create_api_user.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let api_user = {};

        api_user.inputAPIUserName = event.target.inputAPIUserName.value;

        api_user.inputAPIKey = event.target.inputAPIKey.value;
        api_user.inputAPISubscription = event.target.inputAPISubscription.value;
        api_user.inputEmail = event.target.inputEmail.value;


        Meteor.call('create_api_user',
            api_user,
            function (error) {
                $('#submit').attr("disabled", false);
                if (error !== undefined) {
                    alert(error.reason);
                    console.log("error in create api user");
                    console.log(error);
                } else {
                    event.target.inputAPIUserName.value = "";
                    event.target.inputAPIKey.value = "";
                    event.target.inputAPISubscription.value = "";
                    event.target.inputEmail.value = "";
                }
            }
        );

    }
});