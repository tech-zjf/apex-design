import 'apex-design/style';
import { AtInput } from 'apex-design';
import { useState } from 'react';
import { Options } from 'apex-design/dist/at-input';

function AtInputPage() {
    const [content, setContent] = useState('');
    const [user, setUser] = useState<Options[]>([]);
    return (
        <div style={{ padding: '0 20px' }}>
            <label className=" text-red-500">@输入框组件：</label>
            <AtInput
                onRequest={async (key) => {
                    const users = [
                        {
                            name: '张三',
                            id: 1,
                            avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/d499bec908ea4c0619c4fccd416d5e7c~100x100.awebp'
                        },
                        {
                            name: '李四',
                            id: 2,
                            avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/d499bec908ea4c0619c4fccd416d5e7c~100x100.awebp'
                        },
                        {
                            name: '王五',
                            id: 3,
                            avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/d499bec908ea4c0619c4fccd416d5e7c~100x100.awebp'
                        },
                        {
                            name: '王二麻子',
                            id: 4,
                            avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/d499bec908ea4c0619c4fccd416d5e7c~100x100.awebp'
                        }
                    ];
                    return users.filter((u) => u.name.includes(key || ''));
                }}
                onChange={(val, select) => {
                    if (val) {
                        setContent(val);
                        setUser(select);
                    }
                }}
            />
            <h4 className="font-bold mt-10">内容</h4>
            <p className="py-2">{content}</p>

            <h4 className="font-bold mt-10">用户：</h4>
            {user.map((u) => {
                return <p className="py-2">{JSON.stringify(u)}</p>;
            })}
        </div>
    );
}

export default AtInputPage;
