export const FETCH_MEMBER = "FETCH_MEMBER";

export const fetchMemberAction = (data) =>{
    return {
        type: "FETCH_MEMBER",
        payload: data
 }
};

export const ISNOT_SUBMITTED_MEMBER = "ISNOT_SUBMITTED_MEMBER";

export const fetchisNotSubmittedmemberAction = (data) =>{
    return {
        type: "ISNOT_SUBMITTED_MEMBER",
        payload: data
 }
};
export const ADD_STAFF = "ADD_STAFF";

export const addStaffAction = (data) =>{
    return {
        type: "ADD_STAFF",
        payload: data
 }
};
export const DELETE_STAFF = "DELETE_STAFF";

export const deleteStaffAction = (data) =>{
    return {
        type: "DELETE_STAFF",
        payload: data
 }
};
