export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = () => {
    return {
        type: "HIDE_LOADING",
        payload: {
            state: false,
        }
    }
};

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction = (text) => {
    return {
        type: "SHOW_LOADING",
        payload: {
            state: true,
        }
    }
};