export const USER_STAFFDATA = "USER_STAFFDATA";

export const fetchUserDataAction = (userState) => {
    return {
        type: "USER_STAFFDATA",
        payload: {
            isSignedIn: userState.isSignedIn,
            id: userState.id,
            name: userState.name,
            hashedText: userState.hashedText,
            role: userState.role,
            isSubmitted:userState.isSubmitted
        }
    }
};
export const LOGIN = "LOGIN";

export const loginAction = (userState) => {
    return {
        type: "LOGIN",
        payload: {
            isSignedIn: true,
        }
    }
};

export const INITIALIZE_USERDATA = "INITIALIZE_USERDATA";

export const initializeUserDataAction = (userState) => {
    return {
        type: "INITIALIZE_USERDATA",
    }
};

export const SET_ISSUBMITTED = "SET_ISSUBMITTED";

export const setIsSubmittedAction = (userState) => {
    return {
        type: "SET_ISSUBMITTED",
        payload: {
            isSubmitted: userState.isSubmitted
        }

    }
};





