import { createSelector } from "reselect";

const messageSelector = (state) => state.message;

export  const getMessage = createSelector(
    [messageSelector],
    state => state
)

