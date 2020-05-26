export class NewScene extends Phaser.Scene {
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

        //Number of Players
        self.add.text(50, 350, ['Number of', 'Players']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(125, 150, 'players').setScale(.5, .5);




        //With Friends?
        self.add.text(420, 350, ['Play with', 'Friends?']).setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3).setAlign('center');
        self.add.image(495, 150, 'friends').setScale(.5, .5);




        //Timer
        self.add.text(750, 350, 'Use Timer?').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        self.add.image(825, 150, 'timer').setScale(.5, .5);




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