Router.route('/', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition skin-green sidebar-mini');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition skin-green sidebar-mini');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            const user_id = Meteor.userId();

            if (!user_id) {
                return Router.go('sign-in');
            }

            if (Roles.userIsInRole(Meteor.userId(), 'active')) {
                if (Roles.userIsInRole(user_id, 'pharmacist')) {
                    return Router.go('customer-service');
                }

                if (Roles.userIsInRole(user_id, 'admin')) {
                    return Router.go('user-management');
                }
            }

            return Router.go('account-deactivated');
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/sign-in', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition login-page');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition login-page');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (Meteor.userId()) {
                return Router.go('/');
            }

            BlazeLayout.render('common_layout', {
                auth_element: 'sign_in'
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/forgot-password', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition login-page');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition login-page');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (Meteor.userId()) {
                return Router.go('/');
            }

            BlazeLayout.render('common_layout', {
                auth_element: 'forgot_password'
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/reset-password', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition login-page');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition login-page');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (Meteor.userId()) {
                return Router.go('/');
            }

            BlazeLayout.render('common_layout', {
                auth_element: 'reset_password'
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/enroll-account', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition login-page');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition login-page');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (Meteor.userId()) {
                return Router.go('/');
            }

            BlazeLayout.render('common_layout', {
                auth_element: 'enroll_account'
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});

Router.route('/account-deactivated', {
    onBeforeAction: function () {
        $('body').addClass('hold-transition login-page');
        this.next();
    },

    onStop: function () {
        $('body').removeClass('hold-transition login-page');
    },

    action: function () {
        if (Roles.subscription.ready()) {
            if (Roles.userIsInRole(Meteor.userId(), 'active') || !Meteor.userId()) {
                return Router.go('/');
            }

            BlazeLayout.render('common_layout', {
                auth_element: 'account_deactivated'
            });
        } else {
            BlazeLayout.render('loading');
        }
    }
});