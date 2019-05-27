const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const piDataSchema = new Schema({
  device: {
    type: mongoose.Schema.ObjectId,
    ref: "Device"
  },
  temperature: Number,
  humidity: Number,

  created_at: {
    type: Date,
    default: Date.now()
  },
  status: Number
});


const PiData = mongoose.model("PiData", piDataSchema);



module.exports = PiData;