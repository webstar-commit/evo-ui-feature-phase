Template.ApplicationList.events({
    'click .add-application'() {
        Session.set('addingApplication', true)
    }
});


Template.ApplicationList.helpers({
    applications() {
            return Applications.find()
        },
        addingApplication() {
            return Session.get('addingApplication')
        }
});

AutoForm.hooks({
    newApplicationForm: {
        onSuccess() {
            Session.set('addingApplication', false)
        }
    },
    editApplicationForm: {
        onSuccess() {
            Session.set('addingApplication', null)
        }
    }
});

Template.ApplicationSummaryItem.helpers({
    editingApplication(app) {
        return Session.get('editingApplication') == this._id;
    }
})
Template.ApplicationSummaryItem.events({
    'click .edit-application'() {
        Session.set('editingApplication', this._id)
    },
    'click .remove-application'() {
        Applications.remove(this._id);
    }
});