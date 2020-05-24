import 'phaser';
import { TitleScene } from './scenes/titleScene';
import { NewScene } from './scenes/newScene';
import { PersonalizeScene } from './scenes/personalizeScene';
import { RulesScene } from './scenes/rulesScene';
import { CreditsScene } from './scenes/creditsScene';
import { JoinScene } from './scenes/joinScene';
import { LobbyScene } from './scenes/lobbyScene';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game',
    scene: [TitleScene, NewScene, PersonalizeScene, RulesScene, CreditsScene, JoinScene, LobbyScene]
}

export class Game extends Phaser.Game {
    constructor(config: any) {
        super(config);
    }
}

const game = new Game(config);
//deszone.net
