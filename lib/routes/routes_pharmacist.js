Router.route('/customer-service', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (!Roles.userIsInRole(Meteor.userId(), 'active') || !Roles.userIsInRole(Meteor.userId(), 'pharmacist')) {
                return Router.go('/');
            }

            BlazeLayout.render('master_layout', {
                content: 'customer_service',
                side_bar_links: 'pharmacist_side_bar_links',
                page: {
                    link: 'customer-service'
                }
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/view-reports', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (!Roles.userIsInRole(Meteor.userId(), 'active') || !Roles.userIsInRole(Meteor.userId(), 'pharmacist')) {
                return Router.go('/');
            }

            BlazeLayout.render('master_layout', {
                content: 'view_reports',
                side_bar_links: 'pharmacist_side_bar_links',
                page: {
                    link: 'view-reports'
                }
            });
        } else {
            BlazeLayout.render('loading');
        }
    },
});

Router.route('/update-stocks', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (!Roles.userIsInRole(Meteor.userId(), 'active') || !Roles.userIsInRole(Meteor.userId(), 'pharmacist')) {
                return Router.go('/');
            }

            BlazeLayout.render('master_layout', {
                content: 'update_stocks',
                side_bar_links: 'pharmacist_side_bar_links',
                page: {
                    link: 'update-stocks'
                },
                medicine_form: 'add_medicine'
            });
        } else {
            BlazeLayout.render('loading');
        }
    },
});