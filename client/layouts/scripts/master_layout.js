is_master_loaded = false;

Template.master_layout.onRendered(function () {
    if (!is_master_loaded) {
        $.getScript(Meteor.absoluteUrl("dist/js/app.min.js"));
        is_master_loaded = true;
    }
});