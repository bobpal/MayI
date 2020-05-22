import { GameObjects } from 'phaser';

export class Title extends Phaser.Scene {
    titleText: GameObjects.Text;

    constructor() {
        super('Title');
    }

    preload() {
        
    }

    create() {
        //background
        let bgTexture = this.textures.createCanvas('tableTop', 960, 640);
        let context = bgTexture.getContext();
        let grd = context.createRadialGradient(480, 640, 200, 480, 640, 500);
        grd.addColorStop(0, '#478c3e');
        grd.addColorStop(1, '#23611b');
        context.fillStyle = grd;
        context.setTransform(1, 0, 0, .5, 0, 0);
        context.fillRect(0, 0, 960, 1280);
        bgTexture.refresh();
        this.add.image(480, 320, 'tableTop');

        //title
        this.add.text(400, 150, 'May I?').setFontSize(64).setFontFamily('Impact').setColor('#2335a8').setShadow(2, 5, '#333333');
        
    }

    
    
}