APIUsers = new Mongo.Collection('api_users');

APIUsersSchema = new SimpleSchema({
    user_name: {
        type: String,
        label: "user_name",
        min: 10,
        max: 20
    },
    api_key: {
        type: String,
        label: "api_key",
        min: 10,
        max: 10
    },
    subscription: {
        type: String,
        label: "subscription"
    },
    email: {
        type: String,
        label: "email"
    },
    active: {
        type: Boolean,
        label: "active"
    }
});

APIUsers.attachSchema(APIUsersSchema);