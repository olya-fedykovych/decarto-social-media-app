import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear, faPen, faLocationDot, faPalette, faGlobe } from "@fortawesome/free-solid-svg-icons"; 
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import UserImage from "components/UserImage/UserImage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserWidget.scss"


const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        artDirection,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <div className="widget-wrapper user-widget">
            <div className="flex-between user-row-container"
            onClick={() => navigate(`/profile/${userId}`)} >
                <div  className="flex-between user-row">
                    <UserImage image={picturePath} />
                    <div>
                        <h4 className='user-name'>
                            {firstName} {lastName}
                        </h4>
                        <h6 >{friends.length} friends</h6>
                    </div>
                </div>
                <FontAwesomeIcon icon={faUserGear} />
            </div>
    
            <hr/>
    
            <div className='user-data-container'>
                <div className='user-location'>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-lg" />
                    <h5>{location}</h5>
                </div>
                <div className='user-direction'>
                    <FontAwesomeIcon icon={faPalette} className="fa-lg" />
                    <h5 >{artDirection}</h5>
                </div>
            </div>
    
            <hr/>
    
            <div className='user-views-container'>
            <div className="flex-between user-views">
                <h5 >Profile views</h5>
                <h5>
                {viewedProfile}
                </h5>
            </div>
            <div className='flex-between'>
                <h5 >Post Impressions</h5>
                <h5>
                {impressions}
                </h5>
            </div>
            </div>
    
            <hr/>
    
            <div className='user-socials-container'>
            <h4>
                Socials
            </h4>
    
            <div className="flex-between portfolio-container social-gap">
                <div className="flex-between social-gap link">
                <FontAwesomeIcon icon={faGlobe} className="fa-xl" />
                    <div>
                        <h5>
                        Potfolio.com
                        </h5>
                    </div>
                </div>
                <FontAwesomeIcon icon={faPen} className='edit fa-sm' />
            </div>
    
            <div className="flex-between social-gap ">
                <div className="flex-between social-gap link">
                <FontAwesomeIcon icon={faLinkedin} className="fa-xl" />
                <div>
                    <h5>
                    Linkedin
                    </h5>
                </div>
                </div>
                <FontAwesomeIcon icon={faPen} className='edit fa-sm' />
            </div>
            </div>
        </div>
    );
};

export default UserWidget;