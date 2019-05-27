const uniquid = require("uniquid");
const {DBError} = require("../../utils/error/error-types");
const isNil = require("lodash/isNil");
const IotUser = require("../../db/iot-user");
const getClientUserCache = (user) => {
  return IotUser.findById(user._id).lean()
    .then(data => data ? data : new Error("account_not_found"))
};
const checkLogin = ({username, password}) => {
  return IotUser.find({username})
    .then(data => {
      console.log(data)
      if (!data.length) {
        return Promise.reject(new Error("not_existed"));
      }
      return IotUser.find({username, password}).lean();
    })
    .then((user) => {
console.log(user)
      if (!user.length) {
        return Promise.reject(new Error("password_wrong"));
      }
      return user[0];
    })
};
const accountSql = {

  getClientUserCache,
  checkLogin
};

module.exports = accountSql;

