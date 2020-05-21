import 'phaser';
import io from 'socket.io-client';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game',
    scene: {
        preload: {},
        create: {},
    }
}

export class Game extends Phaser.Game {
    constructor(config: any) {
        super(config);
    }
}

const game = new Game(config);
const socket = io("http://localhost:9001");
socket.emit("msg", "test");
