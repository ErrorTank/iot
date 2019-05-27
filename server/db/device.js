const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const deviceSchema = new Schema({
  deviceDescription: {
    type: "String"
  },
  deviceName: String,
  lat: {
    type: Number,
    default: 0
  },
  lng: {
    type: Number,
    default: 0
  },

});


const Device = mongoose.model("Device", deviceSchema);



module.exports = Device;