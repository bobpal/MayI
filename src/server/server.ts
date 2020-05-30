import express from 'express';
import path from 'path';
import { Socket } from 'socket.io';
import { RoomInfo } from '../shared/room';

let roomList: RoomInfo[] = [];
const app = express();
app.set('port', process.env.PORT || 9001);

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req: any, res: any) => {
    res.sendFile(path.resolve('./src/client/index.html'));
});

io.on('connection', function (socket: Socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('getRooms', function () {
        let anonWaitingRooms = roomList.filter(r => r.status === 'waiting' && r.withFriends === false);
        socket.emit('receiveRooms', { rooms: anonWaitingRooms });
    });

    socket.on('newRoom', function (room: RoomInfo) {
        //generate random roomID
        let roomNumber = Math.floor(Math.random() * 9999);
        let roomID = roomNumber.toString();
        room.roomID = roomID.padStart(4, '0');

        //join room
        socket.join(room.roomID);
        console.log(room);

        //add room to list
        roomList.push(room);
    });

    socket.once('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(9001, function () {
    console.log('listening on *:9001');
});