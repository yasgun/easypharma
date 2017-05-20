Meteor.methods({
    create_api_user: function (api_user) {

        APIUsers.insert({
            'user_name': api_user.inputAPIUserName,
            'api_key': api_user.inputAPIKey,
            'subscription': api_user.inputAPISubscription,
            'email': api_user.inputEmail,
            'active': true
        });
    },

    edit_api_user: function (api_user) {

        APIUsers.update({_id: api_user.inputUserId}, {
            $set: {
                'user_name': api_user.inputAPIUserName,
                'api_key': api_user.inputAPIKey,
                'subscription': api_user.inputAPISubscription,
                'email': api_user.inputEmail
            }
        });
    },

    enable_api_user: function (userId) {
        APIUsers.update({_id: userId}, {
            $set: {
                'active': true
            }
        });
    },

    disable_api_user: function (userId) {
        APIUsers.update({_id: userId}, {
            $set: {
                'active': false
            }
        });
    },
});