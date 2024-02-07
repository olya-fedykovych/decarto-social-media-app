import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImage from "../UserImage/UserImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import './Friend.scss'

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { _id } = useSelector((state) => state.user);
const token = useSelector((state) => state.token);
const friends = useSelector((state) => state.user.friends);

const isFriend = friends.find((friend) => friend._id === friendId);

const patchFriend = async () => {
    const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
            method: "PATCH",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <div className="flex-between">
            <div className="flex-between friend-container">
                <UserImage image={userPicturePath} size="55px" />
                <div
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0);
                }}
                >
                    <h5 className="friend-name">
                        {name}
                    </h5>
                    <h6 className="friend-subtitle" fontSize="0.75rem">
                        {subtitle}
                    </h6>
                </div>
            </div>
            <button className="friend-btn"
                onClick={() => patchFriend()}
            >
                {isFriend ? (
                <FontAwesomeIcon icon={faUserMinus} className="fa-sm"/>
                ) : (
                <FontAwesomeIcon icon={faUserPlus} className="fa-sm"/>
                )}
            </button>
        </div>
    );
};

export default Friend;