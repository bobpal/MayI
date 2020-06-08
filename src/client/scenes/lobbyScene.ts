import { PlayerInfo } from "../../shared/player";
import { GameObjects } from "phaser";

export class LobbyScene extends Phaser.Scene {
    player: PlayerInfo;
    socket: SocketIOClient.Socket;
    roomID: string;
    roomIDmessage: GameObjects.Text;
    roomIDbox: GameObjects.Rectangle;
    roomIDnumber: GameObjects.Text;

    constructor() {
        super('LobbyScene');
    }

    init(data: any) {
        this.player = data.player;
        this.socket = data.socket;
        this.roomID = data.roomID;
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

            if (data.room.withFriends === true) {
                self.roomIDmessage.setVisible(true);
                self.roomIDbox.setVisible(true);
                self.roomIDnumber.setVisible(true);
            }
        });

        self.socket.emit('playerJoinedLobby', self.roomID);

        //Waiting text
        self.add.text(200, 50, 'Waiting for other players').setFontSize(50).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        //RoomID
        self.roomIDmessage = self.add.text(600, 350, 'Send room # to friends').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setVisible(false);
        self.roomIDbox = self.add.rectangle(750, 300, 150, 50, 0xffffff).setStrokeStyle(4, 0x000000).setVisible(false);
        self.roomIDnumber = self.add.text(720, 285, self.roomID).setFontSize(30).setFontFamily('Arial').setColor('#000000').setVisible(false);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) {
            self.socket.emit('leaveLobby', self.roomID);
            self.scene.start('JoinScene', { player: self.player, socket: self.socket });
        }, self);
    }



}