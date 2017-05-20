const Config = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

Config.addRoute('config/create-admin/:email/:first_name/:last_name', {authRequired: false}, {
    get: function () {
        let admin = {};
        admin.inputEmail = this.urlParams.email;
        admin.inputAdminName = this.urlParams.first_name + " " + this.urlParams.last_name;

        Meteor.call('create_admin', admin);

        return {status: 'Request Sent', message: 'Admin may or may not be created based on system state and configurations'};
    }
});