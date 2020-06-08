import { GameObjects } from "phaser";
import { JoinScene } from "../scenes/joinScene";
import { RoomInfo } from "../../shared/room";

export class LobbyRoom {
    visibleNumber: number;
    stepSize: number;
    lightOutline: GameObjects.Graphics;
    darkOutline: GameObjects.Graphics;
    hitArea: GameObjects.Rectangle;
    playerText: GameObjects.Text;
    timer: GameObjects.Image;

    constructor(scene: JoinScene, i: number, room: RoomInfo) {
        this.visibleNumber = i;
        this.stepSize = 70;
        let lightG = scene.add.graphics({ lineStyle: { color: 0x42a7f5, width: 4 } });
        let darkG = scene.add.graphics({ lineStyle: { color: 0x2335a8, width: 4 } });
        this.lightOutline = lightG.strokeRoundedRect(50, 125 + (i * this.stepSize), 330, 50, 10).setVisible(false);
        this.darkOutline = darkG.strokeRoundedRect(50, 125 + (i * this.stepSize), 330, 50, 10);
        this.hitArea = scene.add.rectangle(215, 150 + (i * this.stepSize), 330, 50).setInteractive({ useHandCursor: true });
        this.playerText = scene.add.text(75, 135 + (i * this.stepSize), 'Players: ' + room.playerList.length + '/' + room.playerMax);
        this.playerText.setFontSize(30).setFontFamily('Arial').setColor('#000000');
        this.timer = scene.add.image(350, 150 + (i * this.stepSize), 'timer').setScale(.2, .2);

        if (!room.hasTimer) {
            this.timer.setTintFill(0xaaaaaa);
        }

        if (i > 4) {
            this.setVisible(false);
        }

        this.hitArea.on('pointerover', function () {
            this.darkOutline.setVisible(false);
            this.lightOutline.setVisible(true);
        }, this);
        this.hitArea.on('pointerout', function () {
            this.darkOutline.setVisible(true);
            this.lightOutline.setVisible(false);
        }, this);
        this.hitArea.on('pointerdown', function (event: any) {
            scene.roomID = room.roomID;
            scene.socket.emit('joinRoom', room.roomID, scene.player);
        }, this);
    }

    setVisible(vis: boolean) {
        this.darkOutline.setVisible(vis);
        this.hitArea.setVisible(vis);
        this.playerText.setVisible(vis);
        this.timer.setVisible(vis);
    }

    moveDown() {
        //move coordinates
        this.lightOutline.setY(this.lightOutline.y + this.stepSize);
        this.darkOutline.setY(this.darkOutline.y + this.stepSize);
        this.hitArea.setY(this.hitArea.y + this.stepSize);
        this.playerText.setY(this.playerText.y + this.stepSize);
        this.timer.setY(this.timer.y + this.stepSize);

        //set visibility
        this.visibleNumber++;
        if (this.visibleNumber === 0) {
            this.setVisible(true);
        }
        if (this.visibleNumber === 5) {
            this.setVisible(false);
        }
    }

    moveUp() {
        //move coordinates
        this.lightOutline.setY(this.lightOutline.y - this.stepSize);
        this.darkOutline.setY(this.darkOutline.y - this.stepSize);
        this.hitArea.setY(this.hitArea.y - this.stepSize);
        this.playerText.setY(this.playerText.y - this.stepSize);
        this.timer.setY(this.timer.y - this.stepSize);

        //set visibility
        this.visibleNumber--;
        if (this.visibleNumber === 4) {
            this.setVisible(true);
        }
        if (this.visibleNumber === -1) {
            this.setVisible(false);
        }
    }
}