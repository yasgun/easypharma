Router.route('/user-management', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (!Roles.userIsInRole(Meteor.userId(), 'active') || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
                return Router.go('/');
            }

            BlazeLayout.render('master_layout', {
                content: 'user_management',
                side_bar_links: 'admin_side_bar_links',
                user_form: 'create_user',
                page: {
                    link: 'user-management'
                }
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/api-management', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (!Roles.userIsInRole(Meteor.userId(), 'active') || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
                return Router.go('/');
            }

            BlazeLayout.render('master_layout', {
                content: 'api_management',
                side_bar_links: 'admin_side_bar_links',
                user_form: 'create_api_user',
                page: {
                    link: 'api-management'
                }
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});