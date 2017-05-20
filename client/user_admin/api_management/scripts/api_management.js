Template.api_management.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('api_users');
    });
});

Template.api_management.helpers({
    api_users: () => {
        return APIUsers.find({});
    }
});