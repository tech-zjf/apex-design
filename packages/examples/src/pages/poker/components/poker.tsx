import CustomIcon from '@/components/custom-icon';
import { JSX } from 'react/jsx-runtime';

const pokers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '大王', '小王'];

const pokersType = [
    { color: 'red', icon: 'icon-hongtao' },
    { color: 'black', icon: 'icon-heitao' },
    { color: 'black', icon: 'icon-meihua1' },
    { color: 'red', icon: 'icon-fangkuai' }
];

const createPokers = () => {
    let pokersComList: JSX.Element[] = [];
    pokers.forEach((p) => {
        if (['大王', '小王'].includes(p)) {
            // 吊皮儿暂时不需要
        } else {
            const poker = pokersType.map((pt) => {
                return (
                    <div style={{ width: 150, height: 200, color: pt.color }} className="relative rounded-lg bg-white shadow m-6">
                        <h4 className=" text-xl font-semibold absolute left-4 top-4">{p}</h4>
                        <p className=" text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <CustomIcon type={pt.icon}></CustomIcon>
                        </p>
                        <h4 className=" text-xl font-semibold absolute right-4 bottom-4">{p}</h4>
                    </div>
                );
            });
            pokersComList.push(...poker);
        }
    });
    return pokersComList;
};

export default createPokers;
