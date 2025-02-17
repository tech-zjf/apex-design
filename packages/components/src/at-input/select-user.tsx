import React from 'react';
import './index.less';
import { SelectUserProps } from '.';

const SelectUser = React.memo((props: SelectUserProps) => {
    const { options, visible, cursorPosition, onSelect } = props;
    const { x, y } = cursorPosition;
    return (
        <div className={'select-wrap'} style={{ display: `${visible ? 'block' : 'none'}`, position: 'absolute', left: x, top: y + 20 }}>
            <ul>
                {options.map((user) => (
                    <li key={user.id} onClick={() => onSelect(user)}>
                        <img src={user.avatar} alt={user.name} />
                        <span>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default SelectUser;
