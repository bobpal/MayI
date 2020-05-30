import { PlayerInfo } from "../../shared/player";

export class LobbyScene extends Phaser.Scene {
    player: PlayerInfo;
    socket: SocketIOClient.Socket;

    constructor() {
        super('LobbyScene');
    }

    init(data: any) {
        this.player = data.player;
        this.socket = data.socket;
    }

    preload() {

    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');


    }



}