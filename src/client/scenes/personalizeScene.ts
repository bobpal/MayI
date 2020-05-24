export class PersonalizeScene extends Phaser.Scene {
    newGame: boolean;

    constructor() {
        super('PersonalizeScene');
    }

    init(data: any) {
        this.newGame = data.newGame;
    }

    preload() {

    }

    create() {
        //background
        this.add.image(480, 320, 'tableTop');

        
        
    }



}