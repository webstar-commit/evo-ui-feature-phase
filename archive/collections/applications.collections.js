Applications = new Mongo.Collection('applications')

Applications.allow({
    insert: function (userId) {
        return !!userId;
    },
    update: function (userId) {
        return !!userId;
    },
    remove: function (userId) {
        return !!userId;
    }
});

ApplicationInfoSchema = new SimpleSchema({
    "_id": {
      type: Meteor.Collection.ObjectId  
    },
    "image": {
        type: String
    },
    "Command": {
        type: String
    }
});
ApplicationSchema = new SimpleSchema({

    "app_id": {
        label: "App ID",
        type: String
    },
    "app_info": {
        type: ApplicationInfoSchema
    }
});


Applications.attachSchema(ApplicationSchema);