import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";
import { getPosts } from "../../actions/posts";

const Home = () => {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justify="space-between"
					alignItems="stretch"
					spacing={3}>
					<Grid items xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>

					<Grid items xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
