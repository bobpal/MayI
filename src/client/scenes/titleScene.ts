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
        this.add.text(350, 100, 'May I?').setFontSize(100).setFontFamily('Impact').setColor('#2335a8').setStroke('#42a7f5', 3);

        //icons
        this.add.image(150, 200, 'cards');
        this.add.image(800, 200, 'cards');

        //buttons
        let startButton = this.add.text(425, 350, 'Start').setFontSize(50).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        let rulesButton = this.add.text(448, 450, 'Rules').setFontSize(25).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        let creditsButton = this.add.text(440, 500, 'Credits').setFontSize(25).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });

        startButton.on('pointerover', function () { startButton.setColor('#42a7f5') });
        startButton.on('pointerout', function () { startButton.setColor('#2335a8') });
        startButton.on('pointerdown', function (event: any) { this.scene.start('PersonalizeScene') }, this);

        rulesButton.on('pointerover', function () { rulesButton.setColor('#42a7f5') });
        rulesButton.on('pointerout', function () { rulesButton.setColor('#2335a8') });
        rulesButton.on('pointerdown', function (event: any) { this.scene.start('RulesScene'); }, this);

        creditsButton.on('pointerover', function () { creditsButton.setColor('#42a7f5') });
        creditsButton.on('pointerout', function () { creditsButton.setColor('#2335a8') });
        creditsButton.on('pointerdown', function (event: any) { this.scene.start('CreditsScene'); }, this);
    }

    
    
}