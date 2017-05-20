Template.create_user.events({
    'submit form': function (event) {
        event.preventDefault();

        $('#submit').attr("disabled", true);

        let pharmacist = {};

        pharmacist.emailVar = event.target.inputEmail.value;

        pharmacist.inputPharmacistNameVar = event.target.inputPharmacistName.value;
        pharmacist.inputPharmacyNameVar = event.target.inputPharmacyName.value;
        pharmacist.inputContactNoVar = event.target.inputContactNo.value;

        const inputImageVar = document.getElementById('inputImage').files[0];

        const reader = new FileReader();

        reader.onload = function (event) {

            pharmacist.inputImageVar = reader.result;

            Meteor.call('create_pharmacist',
                pharmacist,
                function (error) {
                    $('#submit').attr("disabled", false);

                    if (error !== undefined) {
                        alert(error.reason);
                        console.log("error in create_pharmacist");
                        console.log(error);
                    } else {
                        event.target.inputEmail.value = "";
                        event.target.inputPharmacistName.value = "";
                        event.target.inputPharmacyName.value = "";
                        event.target.inputContactNo.value = "";
                    }
                }
            );

        };

        reader.readAsDataURL(inputImageVar);
    },

    'change #inputImage': function (event) {
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
            img.src = "/dist/img/boxed-bg.jpg";
        }
    },
});