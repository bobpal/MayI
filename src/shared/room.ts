import { PlayerInfo } from "./player";

export class RoomInfo {
    roomID: string;
    playerCount: number;
    playerList: PlayerInfo[];
    withFriends: boolean;
    hasTimer: boolean;
    status: string; //waiting, playing

}