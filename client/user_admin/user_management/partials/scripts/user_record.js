Template.user_record.helpers({
    isActive: function () {
        return Roles.userIsInRole(Template.instance().data._id, 'active');
    }
});

Template.user_record.events({
    'click #single_user_record': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'user_management',
            side_bar_links: 'admin_side_bar_links',
            user_form: 'edit_user',
            page: {
                link: 'user-management'
            },
            user_data: {
                user_id: Template.instance().data._id,
            }
        });
    }
});