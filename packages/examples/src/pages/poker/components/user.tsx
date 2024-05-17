import { ReactNode } from 'react';

export interface UserProps {
    name: string;
    /**
     * 扑克组件
     */
    pokers: ReactNode[];
    /**
     * 已押注-金额
     */
    stake: number;
    /**
     * 状态
     */
    status: '未看牌' | '看牌' | '弃牌';
}

export class User {
    uid: string;
    name: string;
    constructor(uopt: UserProps) {
        this.uid = '';
        this.name = uopt.name;
    }
}
