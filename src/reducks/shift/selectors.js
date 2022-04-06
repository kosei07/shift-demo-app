import { createSelector } from "reselect";

const monthSelector = (state) => state.month;

export  const getMonth = createSelector(
    [monthSelector],
    state => state
)

