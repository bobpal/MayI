export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {

    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');

        this.add.text(50, 50, 'Programming:').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(50, 100, 'Wife & Design:').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(50, 150, 'Artwork:').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(50, 200, 'Game Concept:').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');

        this.add.text(400, 50, 'Robert Palagano').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(400, 100, 'Shing Palagano').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(400, 150, 'Denis      deszone.net').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        this.add.text(400, 200, 'Misty Markel').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        
        //Back Button
        let backButton = this.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5').setShadow(1, 3, '#333333').setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerout', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerdown', function (event: any) { this.scene.start('TitleScene'); }, this);

    }



}