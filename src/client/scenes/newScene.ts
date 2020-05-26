export class NewScene extends Phaser.Scene {
    constructor() {
        super('NewScene');
    }

    preload() {

    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');

        //Start Button
        let startButton = this.add.text(425, 500, 'Start').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3).setInteractive({ useHandCursor: true });
        startButton.on('pointerover', function () { startButton.setColor('#42a7f5') });
        startButton.on('pointerout', function () { startButton.setColor('#2335a8') });
        //startButton.on('pointerdown', function (event: any) { this.scene.start('GameScene'); }, this);

        //Back Button
        let backButton = this.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { this.scene.start('TitleScene'); }, this);

        //Number of Players
        this.add.text(50, 400, 'Number of Players').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');





        //With Friends?
        this.add.text(375, 400, 'Play with Friends?').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');





        //Timer
        this.add.text(750, 400, 'Use Timer?').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
    }



}