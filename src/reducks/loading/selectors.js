import { createSelector } from "reselect";

const loadingSelector = (state) => state.loading;

export const getLoadingState = createSelector(
    [loadingSelector],
    state => state.state
);

