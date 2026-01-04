import googlePlay from '../../assets/googlePlay.png';
import appStore from '../../assets/AppStore.png';
import { Link } from 'react-router';

const AppDownload = () => {
    return (
        <div className='px-6 md:px-10 mt-12'>
            <div className=" px-4  bg-gray-50 dark:bg-gray-800 py-16 text-center rounded-xl shadow-md">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Download the <span className="text-gradient">TravelEase App</span></h2>
                <p className="text-gray-600 w-[90%] mx-auto dark:text-gray-300 mb-6">Book rides faster and enjoy seamless travel with our mobile app.</p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center ">
                    <div className='flex justify-center items-center'>
                        <Link to='https://play.google.com/store/games?hl=en'
                        className="flex items-center justify-center  w-[11.1rem] gap-3 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        <img src={googlePlay} alt="Google Play" className="w-6 h-6" /><span className="font-semibold">Google Play</span>
                    </Link>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Link to='https://www.apple.com/app-store' 
                         className="flex items-center justify-center gap-3 w-[11.1rem] px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        <img src={appStore} alt="App Store" className="w-6 h-6" /><span className="font-semibold">App Store</span>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDownload;