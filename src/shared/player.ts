export class PlayerInfo {
    socketID: string;
    name: string;
    avatar: string;
    cardBack: string;

    constructor(name: string, avatar: string, cardBack: string) {
        this.name = name;
        this.avatar = avatar;
        this.cardBack = cardBack;
    }
}