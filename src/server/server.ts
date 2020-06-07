import express from 'express';
import path from 'path';
import { Socket } from 'socket.io';
import { RoomInfo } from '../shared/room';
import { PlayerInfo } from '../shared/player';

let roomList: RoomInfo[] = [];
const app = express();
const portNum = 9001;
app.set('port', process.env.PORT || portNum);

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
        socket.emit('updateRooms', { rooms: anonWaitingRooms });
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
        socket.emit('getRoomID', { roomID: room.roomID });

        //update join scene
        if (room.withFriends === false) {
            let anonWaitingRooms = roomList.filter(r => r.status === 'waiting' && r.withFriends === false);
            socket.broadcast.emit('updateRooms', { rooms: anonWaitingRooms });
        }
    });

    socket.on('joinRoom', function (roomID: string, player: PlayerInfo) {
        let roomIndex = roomList.findIndex(r => r.roomID === roomID && r.playerList.length < r.playerMax);
        if (roomIndex === -1) {
            socket.emit('validRoom', { valid: false });
        }
        else {
            socket.join(roomID);
            roomList[roomIndex].playerList.push(player);
            socket.emit('validRoom', { valid: true });
            console.log(roomList[roomIndex]);
        }
    });

    socket.on('playerJoinedLobby', function (roomID: string) {
        let room = roomList.find(r => r.roomID === roomID);
        io.in(roomID).emit('lobby', { room: room });
    });

    socket.once('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(portNum, function () {
    console.log('listening on port ' + portNum);
});