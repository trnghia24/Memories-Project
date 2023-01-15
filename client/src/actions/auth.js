import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

// thunk functions to handle async logic
export const signin = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);

		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {}
};

export const signup = (formData, navigate) => async (dispatch) => {
	try {
		// signup the user
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {}
};
