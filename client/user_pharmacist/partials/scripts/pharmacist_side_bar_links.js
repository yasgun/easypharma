Template.pharmacist_side_bar_links.helpers({
    isCustomerService: function () {
        return (Template.instance().data.link == 'customer-service');
    },

    isViewReports: function () {
        return (Template.instance().data.link == 'view-reports');
    },

    isUpdateStocks: function () {
        return (Template.instance().data.link == 'update-stocks');
    }
});

Template.pharmacist_side_bar_links.events({
    'click #customer_service_link': function (event) {
        event.preventDefault();
        Router.go('customer-service');
    },

    'click #view_reports_link': function (event) {
        event.preventDefault();
        Router.go('view-reports');
    },
    'click #update_stocks_link': function (event) {
        event.preventDefault();
        Router.go('update-stocks');
    }
});