import { useSelector } from "react-redux";
import {useMediaQuery} from '@mui/material';
import UserWidget from "../widgets/UserWidget/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget/PostsWidget";
import AdWidget from "../widgets/AdWidget/AdWidget";
import FriendListWidget from "../widgets/FriendListWidget/FriendListWidget";
import Header from "pages/Header/Header";
import './HomePage.scss'

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <div>
            <Header />
            <div 
                className="home-page-container">
                <div className="home-user-widget">
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                <div className="home-posts-widget"
                >
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} />
                </div>
                {isNonMobileScreens && (
                    <div className="home-ad-widget">
                        <div>
                            <AdWidget />
                        </div>
                        <div className="home-friends-widget">
                            <FriendListWidget userId={_id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;