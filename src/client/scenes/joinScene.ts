import { PlayerInfo } from "../../shared/player";
import { RoomInfo } from "../../shared/room";
import { GameObjects } from "phaser";

export class JoinScene extends Phaser.Scene {
    roomTextBox: any;
    player: PlayerInfo;
    lobby: LobbyRoom[];

    constructor() {
        super('JoinScene');
    }

    preload() {
        this.load.html('roomform', './assets/roomform.html');
        this.load.image('timer', './assets/timer.png');
    }

    init(data: any) {
        this.player = data.player;
    }

    create() {
        let self = this;

        //background
        self.add.image(480, 320, 'tableTop');

        //OR
        self.add.text(425, 100, '- OR -').setFontSize(50).setFontFamily('Impact').setColor('#ffffff').setStroke('#2335a8', 3);

        //Room Form
        self.roomTextBox = self.add.dom(750, 300).createFromCache('roomform');

        //Friends text
        self.add.text(600, 50, 'Enter code to join a friend\'s game').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        //Lobby text
        self.add.text(125, 50, 'Find a game to join').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        //Existing Games Container
        self.add.rectangle(215, 290, 350, 350, 0xffffff).setStrokeStyle(4, 0x000000);

        let g = self.add.graphics({ lineStyle: { color: 0x2335a8, width: 4 } });
        self.lobby = [];

        //TODO GET ROOMS FROM SERVER
        let player = new PlayerInfo('player', 'avatar1', 'cardbackred');

        let rr1 = g.strokeRoundedRect(50, 125, 330, 50, 10);
        let room1 = new RoomInfo();
        room1.roomID = '1';
        room1.playerCount = 4;
        room1.withFriends = false;
        room1.hasTimer = true;
        room1.playerList = [player];
        let lobbyroom1 = new LobbyRoom();
        lobbyroom1.room = room1;
        lobbyroom1.rectangle = rr1;

        let rr2 = g.strokeRoundedRect(50, 185, 330, 50, 10);
        let room2 = new RoomInfo();
        room2.roomID = '2';
        room2.playerCount = 3;
        room2.withFriends = false;
        room2.hasTimer = false;
        room2.playerList = [player];
        let lobbyroom2 = new LobbyRoom();
        lobbyroom2.room = room2;
        lobbyroom2.rectangle = rr2;

        self.lobby.push(lobbyroom1);
        self.lobby.push(lobbyroom2);











        //up arrow
        let upArrow = self.add.rectangle(215, 101, 350, 25, 0xffffff).setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true });
        self.add.text(202, 107, '>').setFontSize(20).setFontFamily('Impact').setColor('#000000').setAngle(-90);
        

        //down arrow
        let downArrow = self.add.rectangle(215, 479, 350, 25, 0xffffff).setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true });
        self.add.text(225, 473, '>').setFontSize(20).setFontFamily('Impact').setColor('#000000').setAngle(90);

        //Join Friends Button
        let joinFriendsButton = self.add.text(650, 500, 'Join Room').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        joinFriendsButton.on('pointerover', function () { joinFriendsButton.setColor('#42a7f5') });
        joinFriendsButton.on('pointerout', function () { joinFriendsButton.setColor('#2335a8') });
        joinFriendsButton.on('pointerdown', function (event: any) {
            self.scene.start('LobbyScene');
        }, self);

        //New Game Button
        let newGameButton = self.add.text(50, 500, 'Start New Game').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        newGameButton.on('pointerover', function () { newGameButton.setColor('#42a7f5') });
        newGameButton.on('pointerout', function () { newGameButton.setColor('#2335a8') });
        newGameButton.on('pointerdown', function (event: any) {
            self.scene.start('LobbyScene');
        }, self);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('PersonalizeScene'); }, self);
    }



}

export class LobbyRoom {
    room: RoomInfo;
    rectangle: GameObjects.Graphics;
}
