export const SET_WORKTIME = "SET_WORKTIME";

export const setWorktimeAction = (data) =>{
    return {
        type: "SET_WORKTIME",
        payload:data
}
};

export const CLEAR_WORKTIME = "CLEAR_WORKTIME";

export const clearWorktimeAction = (data) =>{
    return {
        type: "CLEAR_WORKTIME",
        payload:data
}
};

export const FETCH_MONTH_DATA = "FETCH_MONTH_DATA";

export const fetchMonthDataAction = (month_data) =>{
    return {
        type: "FETCH_MONTH_DATA",
        payload:month_data
}
};
export const CLEAR_MONTH_DATA = "CLEAR_MONTH_DATA";

export const clearMonthDataAction = () =>{
    return {
        type: "CLEAR_MONTH_DATA",
}
};

export const FETCH_EVERYONE_MONTH_DATA = "FETCH_EVERYONE_MONTH_DATA";

export const fetchEveryoneMonthDataAction = (data) =>{
    return {
        type: "FETCH_EVERYONE_MONTH_DATA",
        payload:data
}
};

export const INITIALIZE_MONTHDATA = "INITIALIZE_MONTHDATA";

export const initializeMonthDataAction = (userState) => {
    return {
        type: "INITIALIZE_MONTHDATA",
    }
};


