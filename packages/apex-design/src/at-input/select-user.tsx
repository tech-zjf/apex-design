import React from 'react';
import './index.less';
import { SelectComProps } from '.';

const SelectUser = React.memo((props: SelectComProps) => {
    const { options, visible, cursorPosition, onSelect } = props;
    const { x, y } = cursorPosition;
    return (
        <div className={'selectWrap'} style={{ display: `${visible ? 'block' : 'none'}`, position: 'absolute', left: x, top: y + 20 }}>
            <ul>
                {options.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => {
                                onSelect(item);
                            }}
                        >
                            <img src={item.avatar} alt="" />
                            <span>{item.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

export default SelectUser;
