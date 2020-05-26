import { GameObjects } from "phaser";

export class PersonalizeScene extends Phaser.Scene {
    newGame: boolean;
    nameTextBox: any;
    nameTooLong: GameObjects.Text;
    noName: GameObjects.Text;

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
        this.load.html('nameform', './assets/nameform.html');
    }

    create() {
        let self = this;
        //background
        self.add.image(480, 320, 'tableTop');

        //Name
        self.add.text(50, 50, 'Name').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3);
        self.nameTextBox = self.add.dom(500, 65).createFromCache('nameform');

        //Avatar
        self.add.text(50, 200, 'Avatar').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3);
        
        let avatarRect = self.add.graphics({ fillStyle: { color: 0xffffff }, lineStyle: { color: 0x000000, width: 4 } });
        avatarRect.fillRect(200, 140, 600, 150);
        avatarRect.strokeRect(200, 140, 600, 150);

        let cont = self.add.container(500, 213);
        let bob = self.add.image(0, 0, 'avatar1').setScale(.5, .5);
        cont.add([bob]);
        let avatarSelectRect = self.add.graphics({ lineStyle: { color: 0x42a7f5, width: 4 } });
        avatarSelectRect.strokeRoundedRect(450, 145, 100, 140, 20);

        let avatarLeftArrow = self.add.text(135, 160, '<').setFontSize(100).setFontFamily('Impact').setColor('#000000').setInteractive({ useHandCursor: true });
        avatarLeftArrow.on('pointerdown', function (event: any) {
            //move avatars right

        }, self);



        //Card Back
        self.add.text(50, 400, 'Card Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3);




        //Next Button
        let nextButton = self.add.text(425, 500, 'Next').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3).setInteractive({ useHandCursor: true });
        nextButton.on('pointerover', function () { nextButton.setColor('#42a7f5') });
        nextButton.on('pointerout', function () { nextButton.setColor('#2335a8') });
        nextButton.on('pointerdown', function (event: any) {
            if (self.nameTooLong != null) {
                self.nameTooLong.setVisible(false);
            }
            if (self.noName != null) {
                self.noName.setVisible(false);
            }

            let nameInput = self.nameTextBox.getChildByName('nameField');
            if (nameInput.value.length !== 0) {
                if (nameInput.value.length < 11) {



                    //create new Player
                    //go to next scene (new or join)
                }
                else {
                    self.nameTooLong = self.add.text(375, 100, 'Name must be 10 characters or less').setFontSize(15).setFontFamily('Arial').setColor('#ff0000');
                    self.nameTooLong.setVisible(true);
                }
            }
            else {
                self.noName = self.add.text(400, 100, 'Please enter a name').setFontSize(15).setFontFamily('Arial').setColor('#ff0000');
                self.noName.setVisible(true);
            }
        }, self);
        
        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('TitleScene'); }, self);
    }



}