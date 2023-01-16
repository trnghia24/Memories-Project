import React, { useState, useEffect } from "react";
import memories from "../../images/memories.png";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

const NavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	// to avoid manually refresing the page to update user details on Nav Bar whenever sigining in
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch({ type: "LOG_OUT" });
		navigate("/");
		setUser(null);
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to="/"
					className={classes.heading}
					variant="h2"
					align="center">
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt="memories"
					height="60"
				/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.picture}>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user?.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}>
							Log Out
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
