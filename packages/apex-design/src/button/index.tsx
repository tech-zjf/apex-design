import React from 'react';
import './style/index.less';

export interface ButtonProps {
    size?: string;
}

const Button: React.FC<ButtonProps> = props => {
    return <span className="button-wrap">zjf - 我是一个按钮啊</span>;
};
export default Button;
