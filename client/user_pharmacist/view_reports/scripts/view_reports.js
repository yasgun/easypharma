Template.view_reports.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('medicines');
        self.subscribe('stock_medicines');
        self.subscribe('customer_bill_records');
        self.subscribe('customer_bills');
        self.subscribe('stock_bill_records');
        self.subscribe('daily_reports');
    });

    self.search_dates = new ReactiveDict();

    self.search_dates.set("begin", false);
    self.search_dates.set("end", false);

    self.charts = new ReactiveDict();

    self.charts.set("range_pie_chart_options", {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: true,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    });
});

Template.view_reports.helpers({
    customer_bills: () => {
        if (Template.instance().search_dates.get("begin") && Template.instance().search_dates.get("end")) {
            return CustomerBills.find({
                user_id: Meteor.userId(),
                completed: true,
                date: {
                    $gt: new Date(Template.instance().search_dates.get("begin")),
                    $lt: new Date(Template.instance().search_dates.get("end"))
                }
            });
        }
    },
    stock_bills: () => {
        if (Template.instance().search_dates.get("begin") && Template.instance().search_dates.get("end")) {
            return StockBillRecords.find({
                user_id: Meteor.userId(), date: {
                    $gt: new Date(Template.instance().search_dates.get("begin")),
                    $lt: new Date(Template.instance().search_dates.get("end"))
                }
            });
        }
    },

    is_range_set: () => {
        return (Template.instance().search_dates.get("begin") && Template.instance().search_dates.get("end"));
    }
});

Template.view_reports.events({
    'submit form': function (event, template) {
        event.preventDefault();

        const begin = event.target.inputBegin.value;
        const end = event.target.inputEnd.value;

        template.search_dates.set("begin", begin);
        template.search_dates.set("end", end);

        let income = 0;
        let expenses = 0;

        const cursor = DailyReports.find({user_id: Meteor.userId(), date: {$gt: new Date(begin), $lt: new Date(end)}});
        cursor.forEach(function (record) {
            income = income + record.total_amount_received;
            expenses = expenses + record.total_amount_paid;
        });

        const PieData = [
            {
                value: expenses,
                color: "#f56954",
                highlight: "#f56954",
                label: "Expenses"
            },
            {
                value: income,
                color: "#00a65a",
                highlight: "#00a65a",
                label: "Income"
            }
        ];

        range_pie_chart.Doughnut(PieData, template.charts.get("range_pie_chart_options"));
    },
});

Template.view_reports.onRendered(function () {
    $('#inputBegin').datepicker({
        autoclose: true
    });

    $('#inputEnd').datepicker({
        autoclose: true
    });

    const pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    range_pie_chart = new Chart(pieChartCanvas);
});