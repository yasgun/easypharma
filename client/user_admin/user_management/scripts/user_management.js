Template.user_management.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('users');
    });
});

Template.user_management.helpers({
    users: () => {
        return Roles.getUsersInRole("pharmacist");
    }
});