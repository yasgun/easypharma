Meteor.startup(function () {
    smtp = {
        username: Meteor.settings.private.username,
        password: Meteor.settings.private.password,
        server: Meteor.settings.private.server,
        port: Meteor.settings.private.port
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});