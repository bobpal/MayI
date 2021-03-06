import { PlayerInfo } from "../../shared/player";
import { RoomInfo } from "../../shared/room";
import { GameObjects } from "phaser";
import io from 'socket.io-client';
import { LobbyRoom } from "../classes/lobbyroom";

export class JoinScene extends Phaser.Scene {
    roomTextBox: any;
    player: PlayerInfo;
    socket: SocketIOClient.Socket;
    lobby: LobbyRoom[];
    noRoomsMessage: GameObjects.Text;
    roomID: string;

    constructor() {
        super('JoinScene');
    }

    init(data: any) {
        this.player = data.player;
        this.socket = data.socket;
    }

    preload() {
        this.load.html('roomform', './assets/roomform.html');
        this.load.image('timer', './assets/timer.png');
    }

    create() {
        let self = this;
        self.lobby = [];

        if (self.socket == null) {
            self.socket = io.connect('http://localhost:9001');
            self.socket.on('sendSocketID', function (data: any) {
                self.player.socketID = data.socketID;
            });
        }

        self.socket.on('updateRooms', function (data: any) {
            let roomsFromServer: RoomInfo[] = [];
            roomsFromServer = data.rooms;
            self.lobby = [];

            for (let i: number = 0; i < roomsFromServer.length; i++) {
                let lobbyroom = new LobbyRoom(self, i, roomsFromServer[i]);
                self.lobby.push(lobbyroom);
            }

            if (self.lobby.length === 0) {
                self.noRoomsMessage.setVisible(true);
            }
            else {
                self.noRoomsMessage.setVisible(false);
            }
        });

        self.socket.on('validRoom', function (data: any) {
            if (data.valid === true) {
                self.scene.start('LobbyScene', { player: self.player, socket: self.socket, roomID: self.roomID });
            }
            else {
                self.add.text(683, 330, 'Room ID was invalid').setFontSize(15).setFontFamily('Arial').setColor('#ff0000');
            }
        });

        self.socket.emit('getRooms');

        //background
        self.add.image(480, 320, 'tableTop');
        //OR
        self.add.text(425, 100, '- OR -').setFontSize(50).setFontFamily('Impact').setColor('#ffffff').setStroke('#2335a8', 3);
        //Room Form
        self.roomTextBox = self.add.dom(750, 300).createFromCache('roomform');
        //Friends text
        self.add.text(600, 50, 'Enter room # to join a friend\'s game').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        //Lobby text
        self.add.text(125, 50, 'Select a room to join').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        //Existing Games Container
        self.add.rectangle(215, 290, 350, 350, 0xffffff).setStrokeStyle(4, 0x000000);
        //no games available message
        self.noRoomsMessage = self.add.text(50, 230, ['No rooms available', 'Try starting a new room']).setFontSize(30).setFontFamily('Arial').setColor('#000000').setAlign('center');

        //up arrow
        let upArrow = self.add.rectangle(215, 101, 350, 25, 0xffffff).setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true });
        self.add.text(202, 107, '>').setFontSize(20).setFontFamily('Impact').setColor('#000000').setAngle(-90);
        upArrow.on('pointerover', function () { upArrow.setFillStyle(0x42a7f5) });
        upArrow.on('pointerout', function () { upArrow.setFillStyle(0xffffff) });
        upArrow.on('pointerdown', function (event: any) {
            //move rooms down
            if (self.lobby.length > 0 && self.lobby[0].visibleNumber < 0) {
                for (let r of self.lobby) {
                    r.moveDown();
                }
            }
        }, self);

        //down arrow
        let downArrow = self.add.rectangle(215, 479, 350, 25, 0xffffff).setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true });
        self.add.text(225, 473, '>').setFontSize(20).setFontFamily('Impact').setColor('#000000').setAngle(90);
        downArrow.on('pointerover', function () { downArrow.setFillStyle(0x42a7f5) });
        downArrow.on('pointerout', function () { downArrow.setFillStyle(0xffffff) });
        downArrow.on('pointerdown', function (event: any) {
            //move rooms up
            let len = self.lobby.length;
            if (len > 5 && self.lobby[len - 1].visibleNumber > 4) {
                for (let r of self.lobby) {
                    r.moveUp();
                }
            }
        }, self);

        //Join Friends Button
        let joinFriendsButton = self.add.text(650, 500, 'Join Room').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        joinFriendsButton.on('pointerover', function () { joinFriendsButton.setColor('#42a7f5') });
        joinFriendsButton.on('pointerout', function () { joinFriendsButton.setColor('#2335a8') });
        joinFriendsButton.on('pointerdown', function (event: any) {
            self.roomID = self.roomTextBox.getChildByName('roomField').value;

            if (self.roomID != null && self.roomID.match(/\d{4}/).length > 0) {
                self.socket.emit('joinRoom', self.roomID, self.player);
            }
            else {
                self.add.text(683, 330, 'Room ID was invalid').setFontSize(15).setFontFamily('Arial').setColor('#ff0000');
            }

        }, self);

        //New Game Button
        let newGameButton = self.add.text(50, 500, 'Start New Room').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        newGameButton.on('pointerover', function () { newGameButton.setColor('#42a7f5') });
        newGameButton.on('pointerout', function () { newGameButton.setColor('#2335a8') });
        newGameButton.on('pointerdown', function (event: any) {
            self.scene.start('NewScene', { player: self.player, socket: self.socket });
        }, self);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('PersonalizeScene', { player: self.player, socket: self.socket }); }, self);
    }
}


