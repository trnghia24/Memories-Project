import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";

export default combineReducers({ posts, auth }); // key-value pair but since key and value are the same, can just keep one
