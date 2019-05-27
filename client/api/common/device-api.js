
import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const deviceApi = {
  getUserDevices(userID) {
    return authenApi.get("/devices/" + userID);
  },
  getUserDevice(userID, deviceID) {
    return authenApi.get("/device/" + userID + "/" + deviceID);
  },
  deleteUserDevice(userID, deviceID){
    return authenApi.delete("/device/" + userID + "/" + deviceID);
  },
  addNewUserDevice(userID, data){
    return authenApi.post("/device/new/" + userID, data);
  },
  editUserDevice(userID, deviceID,  data){
    return authenApi.put("/device/edit/" + userID + "/" + deviceID, data);
  }
};
