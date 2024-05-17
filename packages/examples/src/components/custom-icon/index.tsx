import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import ReactDOM from 'react-dom/client';

const CustomIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4551883_66p7o9fszc7.js' // 在 iconfont.cn 上生成
});

export default CustomIcon;
