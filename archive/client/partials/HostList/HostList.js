Template.HostList.onCreated(function () {
    REST2DDP.subscribe("rest2ddp", "evolute-hosts", {});
});
Template.HostList.helpers({
    hosts(){
        return hosts.find()
    }
})
