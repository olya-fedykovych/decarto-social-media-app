import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import Friend from "components/Friend/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import './PostWidget.scss'

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
};

    return (
        <div className="widget-wrapper post-container">
            <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
            />
            <p className='post-description'>
            {description}
            </p>
            {picturePath && (
            <img 
                className='post-img'
                alt="post"
                src={`http://localhost:3001/assets/${picturePath}`}
            />
            )}
            <div className="flex-between reactions-row-container">
                <div className="flex-between reactions-container">
                    <div className='flex-between likes-container'>
                        <button onClick={patchLike}>
                            {isLiked ? (
                            <FontAwesomeIcon icon={faHeart} className="fa-lg" /> 
                            ) : (
                            <FontAwesomeIcon icon={farHeart} className="fa-lg" />
                            )}
                        </button>
                        <h6>{likeCount}</h6>
                    </div>
        
                    <div className="flex-between comment-count-container">
                        <button onClick={() => setIsComments(!isComments)}>
                            <FontAwesomeIcon icon={farComment} className="fa-lg" />
                        </button>
                        <h6>{comments.length}</h6>
                    </div>
                </div>
        
                <button>
                    <FontAwesomeIcon icon={faShare} className="fa-lg" />
                </button>
            </div>
            {isComments && (
                <div className='comments-container'>
                    {comments.map((comment, i) => (
                    <div key={`${name}-${i}`}>
                        <hr />
                        <p className='comment-text'>
                        {comment}
                        </p>
                    </div>
                    ))}
                    <hr />
                </div>
            )}
        </div>
    );
};

export default PostWidget;