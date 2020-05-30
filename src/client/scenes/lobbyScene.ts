import { PlayerInfo } from "../../shared/player";

export class LobbyScene extends Phaser.Scene {
    player: PlayerInfo;

    constructor() {
        super('LobbyScene');
    }

    init(data: any) {
        this.player = data.player;
    }

    preload() {

    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');


    }



}