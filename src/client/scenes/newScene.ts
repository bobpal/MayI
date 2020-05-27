import { GameObjects } from "phaser";

export class NewScene extends Phaser.Scene {
    playerCount: GameObjects.Text;

    constructor() {
        super('NewScene');
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

        //boxes
        let coloredBox = self.add.graphics({ fillStyle: { color: 0x2335a8 }, lineStyle: { color: 0x000000, width: 2 } });
        let box = self.add.graphics({ fillStyle: { color: 0xffffff }, lineStyle: { color: 0x000000, width: 2 } });

        //Number of Players
        self.add.text(50, 350, ['Number of', 'Players']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(125, 160, 'players').setScale(.5, .5);
        box.fillRect(50, 250, 150, 80);
        box.strokeRect(50, 250, 150, 80);
        box.strokeRect(150, 250, 50, 40);
        box.strokeRect(150, 290, 50, 40);
        self.playerCount = self.add.text(90, 260, '4').setFontSize(50).setFontFamily('Impact').setColor('#000000')
        let upPlayer = self.add.text(146, 285, '>').setFontSize(50).setFontFamily('Impact').setColor('#000000').setAngle(-90).setInteractive({ useHandCursor: true });
        let downPlayer = self.add.text(203, 295, '>').setFontSize(50).setFontFamily('Impact').setColor('#000000').setAngle(90).setInteractive({ useHandCursor: true });
        upPlayer.on('pointerdown', function (event: any) {
            if (self.playerCount.text === '2') {
                self.playerCount.setText('3');
            }
            else if (self.playerCount.text === '3') {
                self.playerCount.setText('4');
            }
        }, self);
        downPlayer.on('pointerdown', function (event: any) {
            if (self.playerCount.text === '4') {
                self.playerCount.setText('3');
            }
            else if (self.playerCount.text === '3') {
                self.playerCount.setText('2');
            }
        }, self);

        //With Friends?
        self.add.text(420, 350, ['Play with', 'Friends?']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(495, 160, 'friends').setScale(.5, .5);

        //box.fillRoundedRect(450, 280, 60, 30, 15);
        //box.strokeRoundedRect(450, 280, 60, 30, 15);
        coloredBox.fillRoundedRect(450, 280, 60, 30, 15);
        coloredBox.strokeRoundedRect(450, 280, 60, 30, 15);

        //box.fillCircle(465, 295, 13);
        //box.strokeCircle(465, 295, 13);
        box.fillCircle(495, 295, 13);
        box.strokeCircle(495, 295, 13);
        
        //on click {
        //animate moving cirlce between two states
        //set visibility between background boxes
        //set boolean
        //}





        //Timer
        self.add.text(750, 350, 'Use Timer?').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        self.add.image(825, 160, 'timer').setScale(.5, .5);




        //Start Button
        let startButton = self.add.text(425, 500, 'Start').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        startButton.on('pointerover', function () { startButton.setColor('#42a7f5') });
        startButton.on('pointerout', function () { startButton.setColor('#2335a8') });
        startButton.on('pointerdown', function (event: any) {

        }, self);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('PersonalizeScene', { newGame: true }); }, self);
    }



}