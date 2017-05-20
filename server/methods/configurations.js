Meteor.methods({
    create_admin: function (admin) {
        if (Roles.getUsersInRole('admin').count() < 1) {
            const user_id = Accounts.createUser({
                'email': admin.inputEmail,

                'profile': {
                    'user_name': admin.inputAdminName,
                }
            });

            Roles.addUsersToRoles(user_id, ['admin', 'active']);
            Accounts.sendEnrollmentEmail(user_id);
        }
    },
});