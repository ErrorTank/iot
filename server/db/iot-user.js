
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const iotUserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  avatar: String,
  devices: {
    type: [
      {
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
        dataHistory: {
          type: [
            {
              time: {
                type: Date,
                default: Date.now()
              },
              temperature: {
                type: Number,
                default: 0
              },
              humidity: {
                type: Number,
                default: 0
              },
            }
          ],
          default: []
        }
      },

    ],
    default: []
  }
});


const IotUser = mongoose.model("IotUser", iotUserSchema);



module.exports = IotUser;