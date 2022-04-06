import { createSelector } from "reselect";

const periodSelector = (state) => state.period;

export  const getPeriod = createSelector(
    [periodSelector],
    state => state
)

