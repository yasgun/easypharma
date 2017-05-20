Template.api_user_record.helpers({
    isActive: function () {
        return APIUsers.findOne({_id: Template.instance().data._id}).active;
    }
});

Template.api_user_record.events({
    'click #single_api_user_record': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'api_management',
            side_bar_links: 'admin_side_bar_links',
            user_form: 'edit_api_user',
            page: {
                link: 'api-management'
            },
            user_data: {
                api_user_id: Template.instance().data._id,
            }
        });
    }
});