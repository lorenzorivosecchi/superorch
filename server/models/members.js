const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectID,
    ref: "User"
  },
  active: {
    type: Boolean,
    deafult: true
  }
});

module.exports = mongoose.model("Member", memberSchema);