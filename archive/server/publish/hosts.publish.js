Meteor.publish("hosts", () => {
    return Hosts.find({}, {
        limit: 10,
        sort: {
            ReadTime: -1
        }
    });
});