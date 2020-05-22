import 'phaser';
import { Title } from './scenes/title';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game',
    scene: [Title]
}

export class Game extends Phaser.Game {
    constructor(config: any) {
        super(config);
    }
}

const game = new Game(config);
// && copy \"src\\client\\img\" \"dist\\client\\img\\\"
