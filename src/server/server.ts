import express from 'express';
import path from 'path';
import { Socket } from 'socket.io';

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

    socket.on('roomObj', function (data: any) {
        console.log(data);
    });

    socket.once('disconnect', function (socket: Socket) {
        console.log('A user disconnected: ' + socket.id);
    });
});

http.listen(9001, function () {
    console.log('listening on *:9001');
});