REST2DDP = DDP.connect("http://rest2ddp.meteor.com/");
hosts = new Mongo.Collection("hosts", {connection: REST2DDP});