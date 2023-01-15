import {
	Avatar,
	Container,
	Grid,
	Paper,
	Typography,
	Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import useStyles from "./styles";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();
	const INITIAL_FORM_DATA = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [isSignUp, setIsSignUp] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const switchMode = () => {
		setIsSignUp((prev) => !prev);
	};

	const googleSuccess = async (res) => {
		// NOTE: token last for about an hour
		const credential = res?.credential;
		const result = jwt_decode(credential);

		try {
			dispatch({ type: "AUTH", data: { result, token: credential } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
		console.log("Sign In Google unsuccessfully");
	};

	const googleRender = (renderProps) => {
		return (
			<Button
				className={classes.googleButton}
				color="primary"
				fullWidth
				onClick={renderProps.onClick}
				// disabled={renderProps.disabled}
				startIcon={<Icon />}
				variant="contained"></Button>
		);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignUp) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center">
						{isSignUp ? (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>

								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						) : null}

						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
							autoFocus
						/>

						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>

						{isSignUp ? (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								handleChange={handleChange}
								type="password"
							/>
						) : null}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>

						<GoogleLogin
							render={googleRender}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy="single_host_origin"
						/>
					</Grid>

					<Grid container justifyContent="center" alignItems="center">
						<Grid item>
							<Typography variant="body1">
								{isSignUp
									? "Already have an account?"
									: "Don't have an account?"}
							</Typography>
						</Grid>

						<Grid item>
							<Button
								component={Link}
								onClick={switchMode}
								variant="text"
								underline="hover"
								style={{ textTransform: "none", fontStyle: "italic" }}>
								{isSignUp ? "Sign In" : "Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
