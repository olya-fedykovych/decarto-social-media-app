import './AdWidget.scss'

const AdWidget = () => {
    return (
        <div className="widget-wrapper">
            <div className="flex-between">
                <h5 className='sponsored'>
                Sponsored
                </h5>
                <h5 className='create-ad'>Create Ad</h5>
            </div>
            <img className="ad-img"
                alt="advert"
                src="http://localhost:3001/assets/info1.jpg"
            />
            <div className="ad-info">
                <h5 className='ad-name'>MikaCosmetics</h5>
                <h6 className='ad-website'>mikacosmetics.com</h6>
            </div>
            <p>
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </p>
        </div> 
    );
};

export default AdWidget;