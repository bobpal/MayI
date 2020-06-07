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
        let self = this;
        //background
        self.add.image(480, 320, 'tableTop');

        self.socket.on('lobby', function (data: any) {
            for (let i = 0; i < data.room.playerMax; i++) {
                //number box
                self.add.rectangle(150, 200 + (i * 50), 50, 50, 0xffffff).setStrokeStyle(4, 0x000000);
                self.add.text(143, 185 + (i * 50), (i + 1).toString()).setFontSize(30).setFontFamily('Arial').setColor('#000000');
                //name box
                self.add.rectangle(325, 200 + (i * 50), 300, 50, 0xffffff).setStrokeStyle(4, 0x000000);
            }

            for (let i = 0; i < data.room.playerList.length; i++) {
                self.add.text(190, 185 + (i * 50), data.room.playerList[i].name).setFontSize(30).setFontFamily('Arial').setColor('#000000');
            }




        });

        //Friends text
        self.add.text(200, 50, 'Waiting for other players').setFontSize(50).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);



    }



}