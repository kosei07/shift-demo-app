import { createSelector } from "reselect";

const memberSelector = (state) => state.member;

export  const getMember = createSelector(
    [memberSelector],
    state => state.list
)

