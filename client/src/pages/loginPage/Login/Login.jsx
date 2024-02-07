import Form from "../Form/Form";
import '../Login/Login.scss'
import logo from '../../../assets/Logo.png';


const LoginPage = () => {
    return (
    <div className="login-page">
        <div className="overlay">
            <div className="widget-wrapper login-container"
            >
                <div className="logo-container">
                <img src={logo} alt="logo" height="128px" />
                </div>
                <h5 className="form-title">
                Inspire and get inspired on DECARTO.
                </h5>
                <Form />
            </div>
        </div>
    </div>
    );
};

export default LoginPage;