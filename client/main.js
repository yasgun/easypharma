Meteor.startup(() => {
    $.getScript(Meteor.absoluteUrl("plugins/numpad/js/jquery.numpad.js"));
    $.getScript(Meteor.absoluteUrl("plugins/chartjs/Chart.min.js"));
    $.getScript(Meteor.absoluteUrl("plugins/datepicker/bootstrap-datepicker.js"));
});