export class PersonalizeScene extends Phaser.Scene {
    newGame: boolean;

    constructor() {
        super('PersonalizeScene');
    }

    init(data: any) {
        this.newGame = data.newGame;
    }

    preload() {
        this.load.image('avatar1', './assets/avatar 1.png');
        this.load.image('avatar2', './assets/avatar 2.png');
        this.load.image('avatar3', './assets/avatar 3.png');
        this.load.image('avatar4', './assets/avatar 4.png');
        this.load.image('avatar5', './assets/avatar 5.png');
        this.load.image('avatar6', './assets/avatar 6.png');
        this.load.image('avatar7', './assets/avatar 7.png');
        this.load.image('avatar8', './assets/avatar 8.png');
        this.load.image('avatar9', './assets/avatar 9.png');
        this.load.image('avatar10', './assets/avatar 10.png');
        this.load.image('avatar11', './assets/avatar 11.png');
        this.load.image('avatar12', './assets/avatar 12.png');
        this.load.image('avatar13', './assets/avatar 13.png');
        this.load.image('avatar14', './assets/avatar 14.png');
        this.load.image('avatar15', './assets/avatar 15.png');
        this.load.image('avatar16', './assets/avatar 16.png');
        this.load.image('avatar17', './assets/avatar 17.png');
        this.load.image('avatar18', './assets/avatar 18.png');
        this.load.image('avatar19', './assets/avatar 19.png');
        this.load.image('avatar20', './assets/avatar 20.png');

        this.load.image('cardbackblack', './assets/card back black.png');
        this.load.image('cardbackblue', './assets/card back blue.png');
        this.load.image('cardbackgreen', './assets/card back green.png');
        this.load.image('cardbackorange', './assets/card back orange.png');
        this.load.image('cardbackpurple', './assets/card back purple.png');
        this.load.image('cardbackred', './assets/card back red.png');
    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');

        //Name
        this.add.text(50, 50, 'Name').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');
        //add text box with a max of 20 characters


        //Avatar
        this.add.text(50, 200, 'Avatar').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');


        //Card Back
        this.add.text(50, 400, 'Card Back').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5');

        
        //Back Button
        let backButton = this.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#42a7f5').setShadow(1, 3, '#333333').setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerout', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerdown', function (event: any) { this.scene.start('TitleScene'); }, this);
    }



}