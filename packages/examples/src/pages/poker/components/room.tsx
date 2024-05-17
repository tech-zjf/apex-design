import { message } from 'antd';
import { User } from './user';

export type RoomType = '吊皮儿' | '斗地主';

export interface RoomOptions {
    userCount: number;
    type: RoomType;
}

/**
 * 棋牌房间
 */
export class Room {
    type: RoomType;
    userCount: number;
    users: User[];
    constructor(options: RoomOptions) {
        this.type = options.type;
        this.userCount = options.userCount;
        this.users = [];
    }

    enterRoom(user: User) {
        if (this.users.length === this.userCount) {
            message.info('房间已经满了！');
            return;
        }
        this.users.push(user);
    }
    exitRoom(user: User) {}
}
