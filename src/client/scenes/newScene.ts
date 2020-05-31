import { GameObjects } from "phaser";
import { RoomInfo } from "../../shared/room";
import { PlayerInfo } from "../../shared/player";

export class NewScene extends Phaser.Scene {
    playerMax: GameObjects.Text;
    friendCircle: GameObjects.Arc;
    timerCircle: GameObjects.Arc;
    withFriends: boolean;
    hasTimer: boolean;
    player: PlayerInfo;
    socket: SocketIOClient.Socket;

    constructor() {
        super('NewScene');
    }

    init(data: any) {
        this.player = data.player;
        this.socket = data.socket;
    }

    preload() {
        this.load.image('players', './assets/players.png');
        this.load.image('friends', './assets/friends.png');
        this.load.image('timer', './assets/timer.png');
    }

    create() {
        let self = this;

        //background
        self.add.image(480, 320, 'tableTop');

        //Number of Players
        self.add.text(50, 350, ['Number of', 'Players']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(125, 160, 'players').setScale(.5, .5);

        self.add.rectangle(125, 290, 150, 80, 0xffffff).setStrokeStyle(2, 0x000000);
        self.add.rectangle(175, 270, 50, 40, 0xffffff).setStrokeStyle(2, 0x000000);
        self.add.rectangle(175, 310, 50, 40, 0xffffff).setStrokeStyle(2, 0x000000);

        self.playerMax = self.add.text(90, 260, '4').setFontSize(50).setFontFamily('Impact').setColor('#000000')
        let upPlayer = self.add.text(146, 285, '>').setFontSize(50).setFontFamily('Impact').setColor('#000000').setAngle(-90).setInteractive({ useHandCursor: true });
        let downPlayer = self.add.text(203, 295, '>').setFontSize(50).setFontFamily('Impact').setColor('#000000').setAngle(90).setInteractive({ useHandCursor: true });

        upPlayer.on('pointerdown', function (event: any) {
            if (self.playerMax.text === '2') {
                self.playerMax.setText('3');
            }
            else if (self.playerMax.text === '3') {
                self.playerMax.setText('4');
            }
        }, self);

        downPlayer.on('pointerdown', function (event: any) {
            if (self.playerMax.text === '4') {
                self.playerMax.setText('3');
            }
            else if (self.playerMax.text === '3') {
                self.playerMax.setText('2');
            }
        }, self);

        //With Friends?
        self.withFriends = true;
        self.add.text(420, 350, ['Play with', 'Friends?']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(495, 160, 'friends').setScale(.5, .5);

        let friendColoredBg = self.add.graphics({ fillStyle: { color: 0x2335a8 }, lineStyle: { color: 0x000000, width: 2 } });
        let friendGrayBg = self.add.graphics({ fillStyle: { color: 0xaaaaaa }, lineStyle: { color: 0x000000, width: 2 } });

        friendGrayBg.fillRoundedRect(450, 280, 60, 30, 15).setVisible(false);
        friendGrayBg.strokeRoundedRect(450, 280, 60, 30, 15).setVisible(false);
        friendColoredBg.fillRoundedRect(450, 280, 60, 30, 15);
        friendColoredBg.strokeRoundedRect(450, 280, 60, 30, 15);

        self.friendCircle = self.add.circle(495, 295, 14, 0xffffff).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true });

        self.friendCircle.on('pointerdown', function (event: any) {
            if (self.withFriends) {
                self.friendCircle.setX(465);
                self.withFriends = false;
                friendGrayBg.setVisible(true);
                friendColoredBg.setVisible(false);
            }
            else {
                self.friendCircle.setX(495);
                self.withFriends = true;
                friendGrayBg.setVisible(false);
                friendColoredBg.setVisible(true);
            }
        }, self);

        //Timer
        self.hasTimer = false;
        self.add.text(750, 350, 'Use Timer?').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        self.add.image(825, 160, 'timer').setScale(.5, .5);

        let timerColoredBg = self.add.graphics({ fillStyle: { color: 0x2335a8 }, lineStyle: { color: 0x000000, width: 2 } });
        let timerGrayBg = self.add.graphics({ fillStyle: { color: 0xaaaaaa }, lineStyle: { color: 0x000000, width: 2 } });

        timerGrayBg.fillRoundedRect(795, 280, 60, 30, 15);
        timerGrayBg.strokeRoundedRect(795, 280, 60, 30, 15);
        timerColoredBg.fillRoundedRect(795, 280, 60, 30, 15).setVisible(false);
        timerColoredBg.strokeRoundedRect(795, 280, 60, 30, 15).setVisible(false);

        self.timerCircle = self.add.circle(810, 295, 14, 0xffffff).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true });

        self.timerCircle.on('pointerdown', function (event: any) {
            if (self.hasTimer) {
                self.timerCircle.setX(810);
                self.hasTimer = false;
                timerGrayBg.setVisible(true);
                timerColoredBg.setVisible(false);
            }
            else {
                self.timerCircle.setX(840);
                self.hasTimer = true;
                timerGrayBg.setVisible(false);
                timerColoredBg.setVisible(true);
            }
        }, self);


        //Start Button
        let startButton = self.add.text(425, 500, 'Start').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        startButton.on('pointerover', function () { startButton.setColor('#42a7f5') });
        startButton.on('pointerout', function () { startButton.setColor('#2335a8') });
        startButton.on('pointerdown', function (event: any) {
            let roomObj = new RoomInfo();
            roomObj.hasTimer = self.hasTimer;
            roomObj.playerMax = +self.playerMax.text;
            roomObj.withFriends = self.withFriends;
            roomObj.status = 'waiting';
            roomObj.playerList = [];
            roomObj.playerList.push(self.player);

            self.socket.emit('newRoom', roomObj);

            self.scene.start('LobbyScene', { player: self.player });
        }, self);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('JoinScene', { player: self.player, socket: self.socket }); }, self);
    }



}