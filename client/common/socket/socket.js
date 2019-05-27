import io from 'socket.io-client';


const socket = io.connect(process.env.APP_URI);


export default socket;