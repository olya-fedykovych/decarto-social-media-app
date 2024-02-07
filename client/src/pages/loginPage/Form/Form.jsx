import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import '../Form/Form.scss';


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    artDirection: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    artDirection: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    //const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
        formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
            method: "POST",
            body: formData,
        }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
        setPageType("login");
    }
};

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
        dispatch(
            setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
            })
        );
        navigate("/home");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit}>
            <div className="form-container"
                // sx={{
                // "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                // }}
            >
                {isRegister && (
                <>  
                    <div className="input-flex"> 
                        <div className="field-container">
                            <label htmlFor="first name">First Name</label>
                            <input
                            className="first-name-input"
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={
                                Boolean(touched.firstName) && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                            />
                        </div>
                        <div className="field-container">
                            <label htmlFor="last name">Last Name</label>
                            <input
                            className="last-name-input"
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                            />
                        </div>
                    </div>
                    <div className="input-flex">
                        <div className="field-container">
                            <label htmlFor="location">Location</label>
                            <input
                            className="location-input"
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            />
                        </div>
                        <div className="field-container">
                            <label htmlFor="art direction">Art Direction</label>
                            <input
                            className="direction-input"
                            label="Art direction"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.artDirection}
                            name="artDirection"
                            error={
                                Boolean(touched.artDirection) && Boolean(errors.artDirection)
                            }
                            helperText={touched.artDirection && errors.artDirection}
                            />
                        </div>
                    </div>
                        <div 
                        className="img-input"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                <div 
                                    {...getRootProps()}
                                    className="img-drop-field"
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                    <p>Add Picture Here</p>
                                    ) : (
                                    <div className="flex-between">
                                        <span>{values.picture.name}</span>
                                    </div>
                                    )}
                                </div>
                                )}
                            </Dropzone>
                        </div>
                </>
                )}

                    <div className={isLogin? "input-column" : "input-flex"}> 
                        <div className="field-container">
                            <label htmlFor="email">Email</label>
                            <input
                            className="email-input-login"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            />
                        </div>
                        <div className="field-container">
                            <label htmlFor="password">Password</label>
                            <input 
                            className="password-input-login"
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            />
                        </div>
                    </div>
            </div>

            
            <div className="login-btn-container">
                <button
                className="btn"
                fullWidth
                type="submit"
                >
                {isLogin ? "LOGIN" : "REGISTER"}
                </button>
                <Link
                className="login-register-link"
                onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                }}
                >
                {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Link>
            </div>
            </form>
        )}
        </Formik>
    );
};

export default Form;