import createPokers from './components/poker';

const PokerRoom: React.FC = () => {
    const pokersCom = createPokers();
    return (
        <div className="flex flex-wrap ">
            {pokersCom.map((Com, i) => (
                <div key={i}>{Com}</div>
            ))}
        </div>
    );
};
export default PokerRoom;
