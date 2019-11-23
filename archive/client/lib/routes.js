FlowRouter.route('/', {
    name: 'dashboard',
    action() {
        BlazeLayout.render('MainLayout');
    }
});

FlowRouter.route('/containers', {
    name: 'containerList',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'ContainerList'
        });
    }
});

FlowRouter.route('/containers/:lxcId', {
    name: 'containerDetails',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'ContainerDetails'
        });
    }
});

FlowRouter.route('/applications', {
    name: 'applications',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'ApplicationList'
        });
    }
});

FlowRouter.route('/hosts', {
    name: 'hosts',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'HostList'
        });
    }
});