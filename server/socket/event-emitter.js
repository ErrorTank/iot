

const createEventEmitter = () => {
  let thisSocket = null;
  return {
    async init(socket){
      thisSocket = socket;
      return true;
    },
    emit(emitMsg, data){
      thisSocket.emit(emitMsg, data)
    }
  }
};

const deviceEvent = createEventEmitter();

module.exports = deviceEvent;