Template.side_bar.helpers({
    user: () => {
        return Meteor.user();
    },
    isAdmin: () => {
        return Roles.userIsInRole(Meteor.userId(), 'admin');
    }
});