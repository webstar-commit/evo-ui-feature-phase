const _ = require('lodash');
const mongoose = require('mongoose');

function generateId() {
  var id = new mongoose.Types.ObjectId();
  console.log('New id generated: ' + id);
  return id;
}

const crud = {
  create: function(modelClass, req, res) {
    console.log('crud.create: req.body = ', req.body);
    const newInstance = new modelClass(_.defaults({_id: generateId()}, req.body));
    newInstance.save((err) => {
      if (err) {
        console.log('ERROR: ', err);
        res.sendStatus(500);
      } else {
        res.status(201).send(newInstance);
      }
    });
  },
  modify: function(modelClass, req, res) {
    modelClass.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, document) => {
      if (err) {
        console.log('ERROR: ', err);
        res.sendStatus(500);
      } else {
        res.send(document);
      }
    });
  }
};

module.exports = {
  generateId,
  crud
};
