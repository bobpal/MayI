export class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    preload() {
        this.load.image('cards', './assets/cards.png');
    }

    create() {
        //background
        if (!this.textures.exists('tableTop')) {
            let bgTexture = this.textures.createCanvas('tableTop', 960, 640);
            let context = bgTexture.getContext();
            let grd = context.createRadialGradient(480, 640, 200, 480, 640, 500);
            grd.addColorStop(0, '#478c3e');
            grd.addColorStop(1, '#23611b');
            context.fillStyle = grd;
            context.setTransform(1, 0, 0, .5, 0, 0);
            context.fillRect(0, 0, 960, 1280);
            bgTexture.refresh();
        }
        this.add.image(480, 320, 'tableTop');

        //title
        this.add.text(350, 100, 'May I?').setFontSize(100).setFontFamily('Impact').setColor('#42a7f5').setShadow(2, 5, '#333333');

        //icons
        this.add.image(150, 200, 'cards');
        this.add.image(800, 200, 'cards');


        //buttons
        let newButton = this.add.text(150, 400, 'New Game').setFontSize(50).setFontFamily('Impact').setColor('#42a7f5').setShadow(2, 3, '#333333').setInteractive({ useHandCursor: true });
        let joinButton = this.add.text(600, 400, 'Join Game').setFontSize(50).setFontFamily('Impact').setColor('#42a7f5').setShadow(2, 3, '#333333').setInteractive({ useHandCursor: true });
        let rulesButton = this.add.text(448, 400, 'Rules').setFontSize(25).setFontFamily('Impact').setColor('#42a7f5').setShadow(1, 1, '#333333').setInteractive({ useHandCursor: true });
        let creditsButton = this.add.text(440, 450, 'Credits').setFontSize(25).setFontFamily('Impact').setColor('#42a7f5').setShadow(1, 1, '#333333').setInteractive({ useHandCursor: true });


        newButton.on('pointerover', function () { newButton.setColor('#2335a8') });
        newButton.on('pointerout', function () { newButton.setColor('#42a7f5') });
        newButton.on('pointerdown', function (event: any) { this.scene.start('PersonalizeScene', { newGame: true}); }, this);

        joinButton.on('pointerover', function () { joinButton.setColor('#2335a8') });
        joinButton.on('pointerout', function () { joinButton.setColor('#42a7f5') });
        joinButton.on('pointerdown', function (event: any) { this.scene.start('PersonalizeScene', { newGame: false }); }, this);

        rulesButton.on('pointerover', function () { rulesButton.setColor('#2335a8') });
        rulesButton.on('pointerout', function () { rulesButton.setColor('#42a7f5') });
        rulesButton.on('pointerdown', function (event: any) { this.scene.start('RulesScene'); }, this);

        creditsButton.on('pointerover', function () { creditsButton.setColor('#2335a8') });
        creditsButton.on('pointerout', function () { creditsButton.setColor('#42a7f5') });
        creditsButton.on('pointerdown', function (event: any) { this.scene.start('CreditsScene'); }, this);
    }

    
    
}