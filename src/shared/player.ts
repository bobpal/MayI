export class PlayerInfo {
    socket: SocketIOClient.Socket;
    name: string;
    avatar: string;
    cardBack: string;

    constructor(name: string, avatar: string, cardBack: string) {
        this.name = name;
        this.avatar = avatar;
        this.cardBack = cardBack;
    }
}