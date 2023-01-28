import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const Likes = (post) => {
	const user = JSON.parse(localStorage.getItem("profile"));
	const alreadyLiked = post.likes.find(
		(id) => id === (user.result?.sub || user.result?.id)
	);

	// return alreadyLiked ? (
	// 	<>
	// 		<ThumbUpAltIcon fontSize="small" />
	// 		&nbsp; Liked &nbsp;
	// 	</>
	// ) : (
	// 	<>
	// 		{/* <ThumbUpAltOutlinedIcon fontSize="small" />
	// 		&nbsp; Like &nbsp; */}
	// 	</>
	// );

	return (
		<>
			<ThumbUpAltIcon fontSize="small" />
			&nbsp; Liked &nbsp;
		</>
	);
};

export default Likes;
