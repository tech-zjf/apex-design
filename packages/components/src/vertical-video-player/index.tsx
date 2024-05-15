const videos = [
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/9%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/9%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/8.%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/7.%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/6%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/5.%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91%EF%BC%9A.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/4.%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91%EF%BC%9A.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/3%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91%EF%BC%9A.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/2%20%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4',
    'https://upload.42how.com/v/%E8%A7%86%E9%A2%91%E7%B4%A0%E6%9D%90/%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%912/1.%E7%94%B5%E8%BD%A6%E6%96%B0%E6%89%8B%E6%9D%91.mp4'
];

const VerticalVideoPlayer: React.FC = () => {
    return (
        <div className="">
            <video id="prev" src="prev"></video>
            <video id="curent" src=""></video>
            <video id="next" src="next"></video>
        </div>
    );
};

export default VerticalVideoPlayer;
