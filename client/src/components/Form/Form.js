import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

import useStyles from "./styles";

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		// creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);

	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (currentId) {
			dispatch(updatePost(currentId, postData));
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Sign in to create memories and more
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={classes.form}
				onSubmit={handleSubmit}>
				<Typography variant="h6">
					{currentId ? "Editing" : "Creating"} a Memory
				</Typography>

				{/* <TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(event) => {
						setPostData({ ...postData, creator: event.target.value });
					}}
				/> */}
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(event) => {
						setPostData({ ...postData, title: event.target.value });
					}}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(event) => {
						setPostData({ ...postData, message: event.target.value });
					}}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(event) => {
						setPostData({ ...postData, tags: event.target.value.split(",") });
					}}
				/>

				<div className={classes.fileInput}>
					{" "}
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>{" "}
				</div>

				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth>
					{" "}
					SUBMIT
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth>
					CLEAR
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
