Template.nav_bar.helpers({
    user: () => {
        return Meteor.user();
    },
    isAdmin: () => {
        return Roles.userIsInRole(Meteor.userId(), 'admin');
    }
});

Template.nav_bar.events({
    'click #sign_out': function (event) {
        event.preventDefault();

        Meteor.logout(function (error) {
            if (error !== undefined) {
                console.log(error);
            } else {
                Router.go('/');
            }
        });
    },

    'click #logo_image': function (event) {
        event.preventDefault();

        Router.go('/');
    }
});