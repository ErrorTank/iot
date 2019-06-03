


const createEventEmitter = (def = []) => {
  let thisSocket = def;
  return {
    async init(socket){
      thisSocket.push(socket);
      return true;
    },
    emit(id, emitMsg, data){
      thisSocket.find(socket => socket.id === id).emit(emitMsg, data)
    },
    rm(id){
      thisSocket = thisSocket.filter(each => each.id !== id)
    }
  }
};

const deviceEvent = createEventEmitter();

module.exports = deviceEvent;