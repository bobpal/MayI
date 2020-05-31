import { PlayerInfo } from "./player";

export class RoomInfo {
    roomID: string;
    playerMax: number;
    playerList: PlayerInfo[];
    withFriends: boolean;
    hasTimer: boolean;
    status: string; //waiting, playing

}