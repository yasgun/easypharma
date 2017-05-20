Template.edit_user.helpers({
    user: () => {
        return Meteor.users.findOne({_id: Template.instance().data.user_id});
    },

    active: () => {
        return Roles.userIsInRole(Template.instance().data.user_id, 'active');
    },
});

Template.edit_user.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let pharmacist = {};

        pharmacist.userId = Template.instance().data.user_id;
        pharmacist.emailVar = event.target.inputEmail.value;

        pharmacist.inputPharmacistNameVar = event.target.inputPharmacistName.value;
        pharmacist.inputPharmacyNameVar = event.target.inputPharmacyName.value;
        pharmacist.inputContactNoVar = event.target.inputContactNo.value;

        const inputImageVar = document.getElementById('inputImage').files[0];

        if (inputImageVar) {

            const reader = new FileReader();

            reader.onload = function (event) {

                pharmacist.inputImageVar = reader.result;

                Meteor.call('edit_pharmacist',
                    pharmacist,
                    function (error) {
                        if (error !== undefined) {
                            alert(error.reason);
                            console.log("error in edit_pharmacist");
                            console.log(error);
                        } else {
                            BlazeLayout.render('master_layout', {
                                content: 'user_management',
                                side_bar_links: 'admin_side_bar_links',
                                user_form: 'create_user',
                                page: {
                                    link: 'user-management'
                                }
                            });
                        }
                    }
                );

            };

            reader.readAsDataURL(inputImageVar);
        } else {
            Meteor.call('edit_pharmacist',
                pharmacist,
                function (error) {
                    if (error !== undefined) {
                        alert(error.reason);
                        console.log("error in edit_pharmacist");
                        console.log(error);
                    } else {
                        BlazeLayout.render('master_layout', {
                            content: 'user_management',
                            side_bar_links: 'admin_side_bar_links',
                            user_form: 'create_user',
                            page: {
                                link: 'user-management'
                            }
                        });
                    }
                }
            );
        }
    },

    'change #inputImage': function (event, template) {
        event.preventDefault();

        const img = document.getElementById('img_preview');
        const file_error = $('#image_helper_block');
        file_error.html("");
        const file = event.target.files[0];

        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(file.name)[1];

        if (ext == "jpg" || ext == "JPG") {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (event) {
                const result = reader.result;
                img.src = result;
            };
        } else {
            img.removeAttribute("src");
            file_error.html("Only .jpg or .JPG files");
            $('#inputImage').val('');
            const current_img = Meteor.users.findOne({_id: template.data.user_id}).profile.image;
            img.src = current_img;
        }
    },

    'click #cancel_button': function (event) {
        event.preventDefault();

        BlazeLayout.render('master_layout', {
            content: 'user_management',
            side_bar_links: 'admin_side_bar_links',
            user_form: 'create_user',
            page: {
                link: 'user-management'
            }
        });
    },

    'click #enable': function (event) {
        event.preventDefault();

        Meteor.call('enable_pharmacist', Template.instance().data.user_id, function (error) {
            if (error !== undefined) {
                console.log("error in enable_pharmacist");
                console.log(error);
            }
        });
    },

    'click #disable': function (event) {
        event.preventDefault();

        Meteor.call('disable_pharmacist', Template.instance().data.user_id, function (error) {
            if (error !== undefined) {
                console.log("error in disable_pharmacist");
                console.log(error);
            }
        });
    }
});