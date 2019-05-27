const mongoose = require("mongoose");
const {DBError} = require("../../utils/error/error-types");
const isNil = require("lodash/isNil");
const IotUser = require("../../db/iot-user");
const Device = require("../../db/device");
const omit = require("lodash/omit");
const getUserDevices = (userID) => {
  return IotUser.findById(userID).lean()
    .then(data => {
      return data.devices;
    })

};

const deleteUserDevice = (userID, deviceID) => {
  return IotUser.findOneAndUpdate({_id: mongoose.Types.ObjectId(userID)}, {$pull: {devices: {_id: deviceID}}}).lean()
    .then(() => true)
};

const addNewUserDevice = (userID, device) => {
  return IotUser.findOneAndUpdate({_id: mongoose.Types.ObjectId(userID)}, {$push: {devices: {...device}}}, {new: true}).lean()
    .then((data) => data)
};

const getUserDevice = (userID, deviceID) => {
  return IotUser.find({_id: mongoose.Types.ObjectId(userID)}, {"devices": {$elemMatch: {_id: mongoose.Types.ObjectId(deviceID)}}}).lean()
    .then((data) => {
      return data[0].devices[0];
    })
};

const editUserDevice = (userID, deviceID, device) => {
  return IotUser.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(userID),
    "devices._id": mongoose.Types.ObjectId(deviceID)
  }, {$set: {"devices.$": omit(device, ["_id"])}}, {new: true}).lean()
    .then((data) => data)
};

const deviceManager = {

  getUserDevices,
  deleteUserDevice,
  addNewUserDevice,
  getUserDevice,
  editUserDevice

};

module.exports = deviceManager;

