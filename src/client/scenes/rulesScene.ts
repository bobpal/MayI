import { PlayerInfo } from "../../shared/player";

export class RulesScene extends Phaser.Scene {
    player: PlayerInfo;

    constructor() {
        super('RulesScene');
    }

    init(data: any) {
        this.player = data.player;
    }

    preload() {

    }

    create() {
        this.add.text(5, 0, 'How to Play:').setFontSize(15).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 15, 'May I is a contract rummy card game with 7 rounds and the ability to \'buy\' cards.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 25, 'At the beginning of each round, every player is dealt 10 or 12 cards depending on the round.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 35, 'There is a draw and a discard pile in the middle of the table with the discard pile facing up and draw pile facing down.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 45, 'Players take turns going clockwise around the table.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 55, 'At the beginning of each turn, there is a 10 second window where every player, except the player who just discarded,').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 65, 'can indicate that they would like to buy the card on the top of discard pile by clicking on the \'May I ?\' button.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 75, 'If multiple players indicate that they wish to buy the card, the order of precedence goes clockwise from the player whose turn it is.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 85, 'If you buy a card, the cost of buying is that you must also take the card on the top of the draw pile also.').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 105, 'On your turn, the first step is laying down the round objective if you have it.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 115, 'The second step is taking one card from either the draw or discard pile.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 125, 'The third step is laying down additional cards on your or other player\'s cards, but only on the turn after you have layed down.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 135, 'The fourth step is to discard a card from your hand.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 145, 'Your turn ends when you discard a card.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 155, 'The card on the top of the discard pile is only available for the turn after it was discarded.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 165, 'In other words, when a card is discarded and a player buys that card, the card underneath it is not available to take.').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 175, 'Each round has a different objective. See the \'Rounds\' section for individual round objectives.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 185, 'For example, round 1\'s objective is 2 sets of 3.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 195, 'When you have 2 sets in your hand, at the beginning of your turn, before you draw a card, you can lay down the round objective.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 205, 'You cannot lay down more than the round objective. If you have a set of 4, you can only lay down 3 this turn.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 215, 'A round is over when a player has no more cards in their hand.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 225, 'The cards remaining in your hand are totaled up after each round.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 235, 'See the \'Scoring\' section to find out how much each card is worth.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 245, 'The player with the lowest score after all 7 rounds is the winner.').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 265, 'Each game is played with 4 decks including jokers. An ace may be ranked either high or low, but cannot cross over. Jokers are wild.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 275, 'When a player lays down a joker in a run, if another player has the card being substituted, they can replace that joker with their card and take the joker as their own to lay down someplace else.').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 295, 'Round 7 rules:').setFontSize(15).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 310, 'The last round has special rules.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 320, 'To win the round, a player must lay down all the cards in their hand at once and not discard any cards.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 330, 'To achieve this, there a few differences.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 340, 'The first difference is that the runs may be more than 4 cards long.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 350, 'If two runs are of the same suit, there must be a gap inbetween the runs.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 360, 'The steps of your turn are different.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 370, 'The first step is always to draw a card from the draw or discard pile.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 380, 'If you can lay down, you may lay down now.').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 390, 'If you cannot lay down, you must discard.').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 410, 'Rounds:').setFontSize(15).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 425, 'Sets = 3 of a kind').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 435, 'Runs = a sequence of 4 in the same suit').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 455, '1:   2 sets').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 465, '2:   2 runs').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 475, '3:   1 set & 1 run').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 485, '4:   3 runs').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 495, '5:   2 sets & 1 run').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 505, '6:   2 runs & 1 set').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 515, '7:   3 runs (no discard)').setFontSize(10).setFontFamily('Arial').setColor('#000000');

        this.add.text(5, 535, 'Scoring:').setFontSize(15).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 550, '2-7').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 560, '8-King').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 570, 'Ace').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(5, 580, 'Joker').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(50, 550, '= 5 points').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(50, 560, '= 10 points').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(50, 570, '= 20 points').setFontSize(10).setFontFamily('Arial').setColor('#000000');
        this.add.text(50, 580, '= 50 points').setFontSize(10).setFontFamily('Arial').setColor('#000000');


        //Back Button
        let backButton = this.add.text(445, 575, 'Back').setFontSize(30).setFontFamily('Impact').setColor('#2335a8').setStroke('#ffffff', 3).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', function () { backButton.setColor('#42a7f5') });
        backButton.on('pointerout', function () { backButton.setColor('#2335a8') });
        backButton.on('pointerdown', function (event: any) { this.scene.start('TitleScene', { player: this.player }); }, this);
    }



}