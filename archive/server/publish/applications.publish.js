Meteor.publish("applications", () => {
    return Applications.find({}, {
        limit: 10
    });
});