import {resetDatabase} from 'meteor/xolvio:cleaner';

if (Meteor.isClient) {
    let api_user_id;

    describe('api management', function () {
        it('method creates an api user', function () {
            beforeEach(function () {
                resetDatabase();
            });

            let api_user = {};

            api_user.inputAPIUserName = "Example Name";

            api_user.inputAPIKey = "1234567890";
            api_user.inputAPISubscription = "free_subscription";
            api_user.inputEmail = "example@example.com";

            api_user_id = pharmacist_id = Meteor.call('create_api_user', api_user);

        });
    });

    describe('api management', function () {
        it('method edits an api user', function () {
            beforeEach(function () {
                resetDatabase();
            });

            let api_user = {};

            api_user.inputAPIUserName = "Example Name";

            api_user.inputAPIKey = "1234567890";
            api_user.inputAPISubscription = "free_subscription";
            api_user.inputEmail = "example@example.com";
            api_user.inputUserId = api_user_id;

            Meteor.call('edit_api_user', api_user);

        });
    });
}