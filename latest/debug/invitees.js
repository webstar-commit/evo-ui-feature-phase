var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('localhost', 'testing_invitees');

var userSchema = new Schema({
    firstName: String
});
var U = mongoose.model('User', userSchema);

var eventMemberSchema = new Schema ({   
    user: { type : Schema.ObjectId, ref : 'User' },
});
var eventSchema = new Schema({
    invitees : [eventMemberSchema]
});


var A = mongoose.model('A', eventSchema);

mongoose.connection.on('open', function () {
  var u = new U({ firstName: 'aaron' });
  u.save(function (err) {
    if (err) throw err;

    var a = new A;
    a.invitees = [{ user: u._id }];
    a.save(function (err, a) {
      if (err) return console.error(err.stack||err);

      A.find({ 'invitees._id': a.invitees[0]._id })
      .populate('invitees.user')
      .run(function (err, docs) {
        if (err) console.error(err.stack||err);
        console.error('populated user of first result', docs[0].invitees[0]);

        mongoose.connection.db.dropDatabase(function () {
          mongoose.connection.close();
        });
      });
    })
  });
});