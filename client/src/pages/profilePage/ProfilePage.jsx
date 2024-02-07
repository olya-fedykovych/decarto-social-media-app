import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "pages/Header/Header";
import FriendListWidget from "../widgets/FriendListWidget/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget/PostsWidget";
import UserWidget from "../widgets/UserWidget/UserWidget";
import "./ProfilePage.scss"

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); 

    if (!user) return null;

    return (
        <div>
            <Header />
            <div className="profile-page-container"
            >
                <div className="user-widget-profile">
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                <div className="friend-list-widget-profile" />
                    <FriendListWidget userId={userId} />
                </div>
                <div className="my-post-widget-profile"
                >
                    <MyPostWidget picturePath={user.picturePath} />
                <div className="posts-widget-profile" />
                    <PostsWidget userId={userId} isProfile />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
