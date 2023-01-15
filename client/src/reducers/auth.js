import { AUTH, LOG_OUT } from "../constants/actionTypes";
const auth = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };

		case LOG_OUT:
			localStorage.clear();
			window.location.reload();
			return { ...state, authData: null };
		default:
			return state;
	}
};

export default auth;
