Template.admin_side_bar_links.helpers({
    isUserManagement: function () {
        return (Template.instance().data.link == 'user-management');
    },

    isAPIManagement: function () {
        return (Template.instance().data.link == 'api-management');
    }
});

Template.admin_side_bar_links.events({
    'click #user_management_link': function (event) {
        event.preventDefault();
        Router.go('user-management');
    },

    'click #api_management_link': function (event) {
        event.preventDefault();
        Router.go('api-management');
    }
});