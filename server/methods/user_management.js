Meteor.methods({
    create_pharmacist: function (pharmacist) {
        const user_id = Accounts.createUser({
            'email': pharmacist.emailVar,

            'profile': {
                'pharmacist_name': pharmacist.inputPharmacistNameVar,
                'pharmacy_name': pharmacist.inputPharmacyNameVar,
                'contact_no': pharmacist.inputContactNoVar,
                'image': pharmacist.inputImageVar
            }
        });

        Roles.addUsersToRoles(user_id, ['pharmacist', 'active']);
        Accounts.sendEnrollmentEmail(user_id);
    },

    edit_pharmacist: function (pharmacist) {
        if (pharmacist.inputImageVar) {
            Meteor.users.update(pharmacist.userId, {
                $set: {
                    'emails.0.address': pharmacist.emailVar,
                    'emails.0.verified': false,
                    'profile.pharmacist_name': pharmacist.inputPharmacistNameVar,
                    'profile.pharmacy_name': pharmacist.inputPharmacyNameVar,
                    'profile.contact_no': pharmacist.inputContactNoVar,
                    'profile.image': pharmacist.inputImageVar
                }
            });
        } else {
            Meteor.users.update(pharmacist.userId, {
                $set: {
                    'emails.0.address': pharmacist.emailVar,
                    'emails.0.verified': false,
                    'profile.pharmacist_name': pharmacist.inputPharmacistNameVar,
                    'profile.pharmacy_name': pharmacist.inputPharmacyNameVar,
                    'profile.contact_no': pharmacist.inputContactNoVar
                }
            });
        }

        Accounts.sendVerificationEmail(pharmacist.userId);
    },

    enable_pharmacist: function (userId) {
        Roles.addUsersToRoles(userId, 'active');
    },

    disable_pharmacist: function (userId) {
        Roles.removeUsersFromRoles(userId, 'active');
    },
});