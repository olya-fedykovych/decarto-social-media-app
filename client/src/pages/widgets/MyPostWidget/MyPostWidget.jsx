import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash, faImage, faFilm, faPaperclip, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import './MyPostWidget.scss'

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        };

    return (
        <div className="widget-wrapper my-post-container">
            <div className="flex-between user-input-container">
                <UserImage
                    image={picturePath} />
                <input 
                    className="post-input"
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
            </div>
            {isImage && (
            <div className="drop-field-container">
                <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                {({ getRootProps, getInputProps }) => (
                    <div className="flex-between">
                    <div
                        className="drop-field"
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!image ? (
                        <p>Add Image Here</p>
                        ) : (
                        <div className="flex-between edit-img-btn">
                            <p>{image.name}</p>
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                        )}
                    </div>
                    {image && (
                        <button
                        className="delete-img-btn"
                        onClick={() => setImage(null)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                    </div>
                )}
                </Dropzone>
            </div>
            )}
    
            <hr/>
    
            <div className="flex-between">
            <div className="flex-between attachment-btn-gap add-imge" onClick={() => setIsImage(!isImage)}>
                <FontAwesomeIcon icon={faImage} />
                <h4 className="add-img-text attachment-name">
                Image
                </h4>
            </div>
    
            {isMobileScreens ? (
            <div className="flex-between attachment-btn-gap">
                <FontAwesomeIcon icon={faEllipsis} className="show-more-btn" />
            </div>
                
            ) : ( 
                <>
                <div className="flex-between attachment-btn-gap">
                    <FontAwesomeIcon icon={faFilm} />
                    <h4 className="attachment-name">Video</h4>
                </div>
    
                <div className="flex-between attachment-btn-gap">
                    <FontAwesomeIcon icon={faPaperclip} />
                    <h4 className="attachment-name">Attachment</h4>
                </div>
                </>
            )}
    
            <button
                className="btn"
                disabled={!post}
                onClick={handlePost}>
                POST
            </button>
            </div>
        </div>
    );
};

export default MyPostWidget;