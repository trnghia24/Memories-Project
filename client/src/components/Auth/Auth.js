import {
	Avatar,
	Container,
	Grid,
	Paper,
	Typography,
	Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "@mui/material";
import React, { useState } from "react";
import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
	const classes = useStyles();

	const [isSignUp, setIsSignUp] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = () => {};

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const switchMode = () => {
		setIsSignUp((prev) => !prev);
	};

	const handleSubmit = () => {};
	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
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
						)}
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
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					<Grid container justify="center" alignItems="center">
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
