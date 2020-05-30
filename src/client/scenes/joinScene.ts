import { PlayerInfo } from "../../shared/player";
import { RoomInfo } from "../../shared/room";
import { GameObjects } from "phaser";
import io from 'socket.io-client';

export class JoinScene extends Phaser.Scene {
    roomTextBox: any;
    player: PlayerInfo;
    socket: SocketIOClient.Socket;
    lobby: LobbyRoom[];

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

        self.socket = io.connect('http://localhost:9001');
        self.socket.on('receiveRooms', function (data: any) {
            let roomsFromServer: RoomInfo[] = [];
            roomsFromServer = data.rooms;

            for (let i: number = 0; i < roomsFromServer.length; i++) {
                let lobbyroom = new LobbyRoom(self, i, roomsFromServer[i]);
                self.lobby.push(lobbyroom);
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
        self.add.text(125, 50, 'Find a game to join').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        //Existing Games Container
        self.add.rectangle(215, 290, 350, 350, 0xffffff).setStrokeStyle(4, 0x000000);

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
            self.scene.start('LobbyScene', { player: self.player, socket: self.socket });
        }, self);

        //New Game Button
        let newGameButton = self.add.text(50, 500, 'Start New Game').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
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















export class LobbyRoom {
    visibleNumber: number;
    stepSize: number;
    lightOutline: GameObjects.Graphics;
    darkOutline: GameObjects.Graphics;
    hitArea: GameObjects.Rectangle;
    playerText: GameObjects.Text;
    timer: GameObjects.Image;

    constructor(scene: JoinScene, i: number, room: RoomInfo) {
        this.visibleNumber = i;
        this.stepSize = 70;
        let lightG = scene.add.graphics({ lineStyle: { color: 0x42a7f5, width: 4 } });
        let darkG = scene.add.graphics({ lineStyle: { color: 0x2335a8, width: 4 } });
        this.lightOutline = lightG.strokeRoundedRect(50, 125 + (i * this.stepSize), 330, 50, 10).setVisible(false);
        this.darkOutline = darkG.strokeRoundedRect(50, 125 + (i * this.stepSize), 330, 50, 10);
        this.hitArea = scene.add.rectangle(215, 150 + (i * this.stepSize), 330, 50).setInteractive({ useHandCursor: true });
        this.playerText = scene.add.text(75, 135 + (i * this.stepSize), 'Players: ' + room.playerList.length + '/' + room.playerCount);
        this.playerText.setFontSize(30).setFontFamily('Arial').setColor('#000000');
        this.timer = scene.add.image(350, 150 + (i * this.stepSize), 'timer').setScale(.2, .2);

        if (!room.hasTimer) {
            this.timer.setTintFill(0xaaaaaa);
        }

        if (i > 4) {
            this.setVisible(false);
        }

        this.hitArea.on('pointerover', function () {
            this.darkOutline.setVisible(false);
            this.lightOutline.setVisible(true);
        }, this);
        this.hitArea.on('pointerout', function () {
            this.darkOutline.setVisible(true);
            this.lightOutline.setVisible(false);
        }, this);
        this.hitArea.on('pointerdown', function (event: any) {
           
        }, this);
    }

    setVisible(vis: boolean) {
        this.darkOutline.setVisible(vis);
        this.hitArea.setVisible(vis);
        this.playerText.setVisible(vis);
        this.timer.setVisible(vis);
    }

    moveDown() {
        //move coordinates
        this.lightOutline.setY(this.lightOutline.y + this.stepSize);
        this.darkOutline.setY(this.darkOutline.y + this.stepSize);
        this.hitArea.setY(this.hitArea.y + this.stepSize);
        this.playerText.setY(this.playerText.y + this.stepSize);
        this.timer.setY(this.timer.y + this.stepSize);

        //set visibility
        this.visibleNumber++;
        if (this.visibleNumber === 0) {
            this.setVisible(true);
        }
        if (this.visibleNumber === 5) {
            this.setVisible(false);
        }
    }

    moveUp() {
        //move coordinates
        this.lightOutline.setY(this.lightOutline.y - this.stepSize);
        this.darkOutline.setY(this.darkOutline.y - this.stepSize);
        this.hitArea.setY(this.hitArea.y - this.stepSize);
        this.playerText.setY(this.playerText.y - this.stepSize);
        this.timer.setY(this.timer.y - this.stepSize);

        //set visibility
        this.visibleNumber--;
        if (this.visibleNumber === 4) {
            this.setVisible(true);
        }
        if (this.visibleNumber === -1) {
            this.setVisible(false);
        }
    }
}
