import { GameObjects } from "phaser";
import { PlayerInfo } from "../../shared/player";

export class PersonalizeScene extends Phaser.Scene {
    nameTextBox: any;
    nameTooLong: GameObjects.Text;
    noName: GameObjects.Text;
    avatarArray: GameObjects.Image[];
    backArray: GameObjects.Image[];
    player: PlayerInfo;
    socket: SocketIOClient.Socket;

    constructor() {
        super('PersonalizeScene');
    }

    init(data: any) {
        this.player = data.player;
        this.socket = data.socket;
    }

    preload() {
        this.load.image('avatar1', './assets/avatar1.png');
        this.load.image('avatar2', './assets/avatar2.png');
        this.load.image('avatar3', './assets/avatar3.png');
        this.load.image('avatar4', './assets/avatar4.png');
        this.load.image('avatar5', './assets/avatar5.png');
        this.load.image('avatar6', './assets/avatar6.png');
        this.load.image('avatar7', './assets/avatar7.png');
        this.load.image('avatar8', './assets/avatar8.png');
        this.load.image('avatar9', './assets/avatar9.png');
        this.load.image('avatar10', './assets/avatar10.png');
        this.load.image('avatar11', './assets/avatar11.png');
        this.load.image('avatar12', './assets/avatar12.png');
        this.load.image('avatar13', './assets/avatar13.png');
        this.load.image('avatar14', './assets/avatar14.png');
        this.load.image('avatar15', './assets/avatar15.png');
        this.load.image('avatar16', './assets/avatar16.png');
        this.load.image('avatar17', './assets/avatar17.png');
        this.load.image('avatar18', './assets/avatar18.png');
        this.load.image('avatar19', './assets/avatar19.png');
        this.load.image('avatar20', './assets/avatar20.png');

        
        this.load.image('cardbackblue', './assets/cardbackblue.png');
        this.load.image('cardbackpurple', './assets/cardbackpurple.png');
        this.load.image('cardbackblack', './assets/cardbackblack.png');
        this.load.image('cardbackred', './assets/cardbackred.png');
        this.load.image('cardbackorange', './assets/cardbackorange.png');
        this.load.image('cardbackgreen', './assets/cardbackgreen.png');
        this.load.html('nameform', './assets/nameform.html');
    }

    create() {
        let self = this;
        //background
        self.add.image(480, 320, 'tableTop');

        //Name form
        self.add.text(50, 50, 'Name :').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);
        self.nameTextBox = self.add.dom(500, 65).createFromCache('nameform');

        //Avatar
        self.add.text(50, 200, 'Avatar :').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        self.add.rectangle(500, 215, 400, 150, 0xffffff).setStrokeStyle(4, 0x000000);

        let avatarCont = self.add.container(500, 213);
        self.avatarArray = [];
        self.avatarArray.push(self.add.image(0, 0, 'avatar1'));
        self.avatarArray.push(self.add.image(125, 0, 'avatar2'));
        self.avatarArray.push(self.add.image(250, 0, 'avatar3'));
        self.avatarArray.push(self.add.image(375, 0, 'avatar4'));
        self.avatarArray.push(self.add.image(500, 0, 'avatar5'));
        self.avatarArray.push(self.add.image(625, 0, 'avatar6'));
        self.avatarArray.push(self.add.image(750, 0, 'avatar7'));
        self.avatarArray.push(self.add.image(875, 0, 'avatar8'));
        self.avatarArray.push(self.add.image(1000, 0, 'avatar9'));
        self.avatarArray.push(self.add.image(1125, 0, 'avatar10'));
        self.avatarArray.push(self.add.image(1250, 0, 'avatar11'));
        self.avatarArray.push(self.add.image(1375, 0, 'avatar12'));
        self.avatarArray.push(self.add.image(1500, 0, 'avatar13'));
        self.avatarArray.push(self.add.image(1625, 0, 'avatar14'));
        self.avatarArray.push(self.add.image(1750, 0, 'avatar15'));
        self.avatarArray.push(self.add.image(1875, 0, 'avatar16'));
        self.avatarArray.push(self.add.image(2000, 0, 'avatar17'));
        self.avatarArray.push(self.add.image(2125, 0, 'avatar18'));
        self.avatarArray.push(self.add.image(2250, 0, 'avatar19'));
        self.avatarArray.push(self.add.image(2375, 0, 'avatar20'));
        avatarCont.add(self.avatarArray);
        let avatarSelectRect = self.add.graphics({ lineStyle: { color: 0x42a7f5, width: 4 } });
        avatarSelectRect.strokeRoundedRect(450, 145, 100, 140, 20);
        self.setVisibility(self.avatarArray, 125);
        
        let avatarLeftArrow = self.add.text(230, 160, '<').setFontSize(100).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        avatarLeftArrow.on('pointerover', function () { avatarLeftArrow.setColor('#42a7f5') });
        avatarLeftArrow.on('pointerout', function () { avatarLeftArrow.setColor('#2335a8') });
        avatarLeftArrow.on('pointerdown', function (event: any) {
            if (self.avatarArray[0].x !== 0) {
                //move avatars right
                for (let img of self.avatarArray) {
                    img.setX(img.x + 125);
                }
                self.setVisibility(self.avatarArray, 125);
            }
        }, self);

        let avatarRightArrow = self.add.text(710, 160, '>').setFontSize(100).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        avatarRightArrow.on('pointerover', function () { avatarRightArrow.setColor('#42a7f5') });
        avatarRightArrow.on('pointerout', function () { avatarRightArrow.setColor('#2335a8') });
        avatarRightArrow.on('pointerdown', function (event: any) {
            if (self.avatarArray[self.avatarArray.length - 1].x !== 0) {
                //move avatars left
                for (let img of self.avatarArray) {
                    img.setX(img.x - 125);
                }
                self.setVisibility(self.avatarArray, 125);
            }
        }, self);


        //Card Back
        self.add.text(50, 380, 'Card Back :').setFontSize(30).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        self.add.rectangle(500, 405, 400, 150, 0xffffff).setStrokeStyle(4, 0x000000);

        let cont = self.add.container(500, 405);
        self.backArray = [];
        self.backArray.push(self.add.image(0, 0, 'cardbackblue').setScale(.3, .3));
        self.backArray.push(self.add.image(125, 0, 'cardbackpurple').setScale(.3, .3));
        self.backArray.push(self.add.image(250, 0, 'cardbackblack').setScale(.3, .3));
        self.backArray.push(self.add.image(375, 0, 'cardbackred').setScale(.3, .3));
        self.backArray.push(self.add.image(500, 0, 'cardbackorange').setScale(.3, .3));
        self.backArray.push(self.add.image(625, 0, 'cardbackgreen').setScale(.3, .3));

        cont.add(self.backArray);
        let backSelectRect = self.add.graphics({ lineStyle: { color: 0x42a7f5, width: 4 } });
        backSelectRect.strokeRoundedRect(450, 335, 100, 140, 20);
        self.setVisibility(self.backArray, 125);

        let backLeftArrow = self.add.text(230, 340, '<').setFontSize(100).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backLeftArrow.on('pointerover', function () { backLeftArrow.setColor('#42a7f5') });
        backLeftArrow.on('pointerout', function () { backLeftArrow.setColor('#2335a8') });
        backLeftArrow.on('pointerdown', function (event: any) {
            if (self.backArray[0].x !== 0) {
                //move backs right
                for (let img of self.backArray) {
                    img.setX(img.x + 125);
                }
                self.setVisibility(self.backArray, 125);
            }
        }, self);

        let backRightArrow = self.add.text(710, 340, '>').setFontSize(100).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backRightArrow.on('pointerover', function () { backRightArrow.setColor('#42a7f5') });
        backRightArrow.on('pointerout', function () { backRightArrow.setColor('#2335a8') });
        backRightArrow.on('pointerdown', function (event: any) {
            if (self.backArray[self.backArray.length - 1].x !== 0) {
                //move backs left
                for (let img of self.backArray) {
                    img.setX(img.x - 125);
                }
                self.setVisibility(self.backArray, 125);
            }
        }, self);


        //Next Button
        let nextButton = self.add.text(430, 500, 'Next').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
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
                    let ava = self.avatarArray.find(a => a.x === 0);
                    let cBack = self.backArray.find(a => a.x === 0);

                    //create new Player
                    let player = new PlayerInfo(nameInput.value, ava.texture.key, cBack.texture.key);

                    self.scene.start('JoinScene', { player: player, socket: self.socket });
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
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('TitleScene', { player: self.player, socket: self.socket }); }, self);
    }

    setVisibility(images: GameObjects.Image[], stepWidth: number) {
        for (let i of images) {
            if (i.x === 0 || Math.abs(i.x) === stepWidth) {
                i.setVisible(true);
            }
            else {
                i.setVisible(false);
            }
        }
    }

}