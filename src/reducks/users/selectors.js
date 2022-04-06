import { createSelector } from "reselect";

const userSelector = (state) => state.user;

export  const getUserData = createSelector(
    [userSelector],
    state => state
)

