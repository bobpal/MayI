export class JoinScene extends Phaser.Scene {
    roomTextBox: any;

    constructor() {
        super('JoinScene');
    }

    preload() {
        this.load.html('roomform', './assets/roomform.html');
    }

    create() {
        let self = this;

        //background
        self.add.image(480, 320, 'tableTop');

        //OR
        self.add.text(425, 250, '- OR -').setFontSize(50).setFontFamily('Impact').setColor('#ffffff').setStroke('#2335a8', 3);

        //Room Form
        self.roomTextBox = self.add.dom(750, 350).createFromCache('roomform');

        //Friends text
        self.add.text(600, 200, 'Enter code to join a friend\'s game').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);

        //Lobby text
        self.add.text(125, 200, 'Enter matchmaking lobby').setFontSize(20).setFontFamily('Arial').setColor('#ffffff').setStroke('#2335a8', 3);


        //Join Friends Button
        let joinFriendsButton = self.add.text(650, 400, 'Join Room').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        joinFriendsButton.on('pointerover', function () { joinFriendsButton.setColor('#42a7f5') });
        joinFriendsButton.on('pointerout', function () { joinFriendsButton.setColor('#2335a8') });
        joinFriendsButton.on('pointerdown', function (event: any) {
            
        }, self);

        //Join Lobby Button
        let joinLobbyButton = self.add.text(130, 400, 'Join Lobby').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        joinLobbyButton.on('pointerover', function () { joinLobbyButton.setColor('#42a7f5') });
        joinLobbyButton.on('pointerout', function () { joinLobbyButton.setColor('#2335a8') });
        joinLobbyButton.on('pointerdown', function (event: any) {

        }, self);

        //Back Button
        let backButton = self.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { self.scene.start('PersonalizeScene', { newGame: false }); }, self);
    }



}