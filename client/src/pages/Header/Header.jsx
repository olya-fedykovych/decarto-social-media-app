import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faBell, faMagnifyingGlass, faXmark, faMoon, faSun, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useContext } from "react";
import { ThemeContext } from "../../components/Theme";
import { useNavigate } from "react-router-dom";
import { Select, FormControl, MenuItem } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import logo from '../../assets/Logo.png';
import './Header.scss'


const Header = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { theme, toggleTheme } = useContext(ThemeContext);
    

    const fullName = user === null ? "Default User" : `${user.firstName} ${user.lastName}`;

    return (
        <header  className="flex-between header" >
            <div className="flex-between logo-container">
                {isNonMobileScreens && (
                <div className="flex-between search-container">
                    <input className="search-input" placeholder="Search..." />
                    <button className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" />
                    </button>
                </div>
            )}
                <img className="logo" src={logo} alt="logo" height={isMobileScreens ? "72px" : "108px"} 
                onClick={() => navigate("/home")}
                >
                </img>
            </div>


            {isNonMobileScreens ? (
            <div className="flex-between header-items-container">
                <button onClick={() => toggleTheme()}>
                    { theme === "dark-theme" ? (
                    <FontAwesomeIcon icon={faMoon} className="fa-xl" />
                    ) : (
                    <FontAwesomeIcon icon={faSun} className="fa-xl"/>
                    )}
                </button>
                <FontAwesomeIcon icon={faPaperPlane} className="fa-xl" />
                <FontAwesomeIcon icon={faBell} className="fa-xl" />
                <FormControl value={fullName}>
                    <Select className="select-desktop"
                    value={fullName}
                    sx={{
                        backgroundColor: "#FAFAFA",
                        color: "#3B281A",
                        width: "150px",
                        height: "30px",
                        border: "1px solid #AC9E91",
                        borderRadius: "0",
                        p: "0",
                        '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }, 
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem",
                        }
                    }}
                >
                    <MenuItem className="option" value={fullName}
                    sx={{
                        color: "#3B281A", 
                        borderRadius: "0", 
                        backgroundColor: "#E4E0DB !important",
                            "&:focus": { backgroundColor: "#DDD8D3 !important" ,
                                "&:hover": { backgroundColor: '#E4E0DB !important'}}
                            }}>
                        <p>{fullName}</p>
                    </MenuItem>
                    <MenuItem sx={{color: "#3B281A"}} onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    
                    </Select>
                </FormControl>
            </div>
        ) : (
            <button
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <FontAwesomeIcon icon={faBars} className="fa-xl" />
            </button>
    )}

        {!isNonMobileScreens && isMobileMenuToggled && (
            <div className="menu-mobile">
                <div className="exit-btn">
                    <button
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                    <FontAwesomeIcon icon={faXmark} className="fa-xl" />
                    </button>
                </div>

          {/* MENU ITEMS */}
                <div className="flex-between menu-mobile-container">
                        <button onClick={() => toggleTheme()}>
                            { theme === "dark-theme" ? (
                            <FontAwesomeIcon icon={faMoon} className="fa-xl" />
                            ) : (
                            <FontAwesomeIcon icon={faSun} className="fa-xl"/>
                            )}
                        </button>
                        <FontAwesomeIcon icon={faPaperPlane} className="fa-xl" />
                        <FontAwesomeIcon icon={faBell} className="fa-xl" />
                        <FormControl value={fullName}>
                            <Select className="select-mobile"
                                value={fullName}
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#3B281A",
                                    width: "150px",
                                    height: "30px",
                                    border: "1px solid #AC9E91",
                                    borderRadius: "0",
                                    p: "0",
                                    '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }, 
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    }
                                }}
                            >
                            <MenuItem className="option" value={fullName}
                                sx={{
                                    color: "#3B281A", 
                                    borderRadius: "0", 
                                    backgroundColor: "#E4E0DB !important",
                                        "&:focus": { backgroundColor: "#DDD8D3 !important" ,
                                            "&:hover": { backgroundColor: '#E4E0DB !important'}}
                                    }}>
                                <p>{fullName}</p>
                            </MenuItem>
                            <MenuItem className="option" onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

