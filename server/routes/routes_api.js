const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

//FREE AND PAID SUBSCRIPTION REQUESTS

Api.addRoute(':key/medicines', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['free_subscription', 'paid_subscription']}
        });

        if (api_user) {
            return Medicines.find({}).fetch();
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});

Api.addRoute(':key/search-medicine/:term', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['free_subscription', 'paid_subscription']}
        });

        if (api_user) {
            return Medicines.find({
                $or: [
                    {general_name: {$regex: this.urlParams.term}},
                    {scientific_name: {$regex: this.urlParams.term}},
                ]
            }, {fields: {_id: 0, unit_name: 0}}).fetch();
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});

//PAID SUBSCRIPTION REQUESTS

Api.addRoute(':key/pharmacies', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['paid_subscription']}
        });

        if (api_user) {
            return Meteor.users.find({}, {fields: {_id: 0, services: 0, createdAt: 0, roles: 0}}).fetch();
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});

Api.addRoute(':key/quantity/:medicine_id/:user_id', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['paid_subscription']}
        });

        if (api_user) {
            return StockMedicines.findOne({
                medicine_id: this.urlParams.medicine_id,
                user_id: this.urlParams.user_id
            }).quantity;
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});

Api.addRoute(':key/unit_name/:medicine_id', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['paid_subscription']}
        });

        if (api_user) {
            return Medicines.findOne({_id: this.urlParams.medicine_id}).unit_name;
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});

Api.addRoute(':key/selling_price/:medicine_id/:user_id', {authRequired: false}, {
    get: function () {
        const api_user = APIUsers.findOne({
            api_key: this.urlParams.key,
            subscription: {$in: ['paid_subscription']}
        });

        if (api_user) {
            return StockMedicines.findOne({
                medicine_id: this.urlParams.medicine_id,
                user_id: this.urlParams.user_id
            }).selling_price;
        }
        return {
            statusCode: 404,
            body: {status: 'Not Available', message: 'Requested  data not available'}
        };
    }
});