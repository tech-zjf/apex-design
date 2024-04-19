import 'apex-design/style';
import { AtInput } from 'apex-design';

function App() {
    return (
        <div style={{ padding: '0 20px' }}>
            <label>@输入框组件：</label>
            <AtInput
                onRequest={async (key) => {
                    let user = [
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
                    return user.filter((u) => u.name.includes(key || ''));
                }}
                onChange={(content, select) => {
                    console.log(content, select);
                }}
            ></AtInput>
        </div>
    );
}

export default App;
