import React from "react"
import {useSelector} from "react-redux";
import {getLoadingState, getLoadingText} from "../../reducks/loading/selectors";

const Loading = ()=>{
    const selector = useSelector((state) => state);
    const isBeingLoaded = getLoadingState(selector);
    const loadingText  = getLoadingText(selector)

    return (
        <>
            {(isBeingLoaded) && (
                <section className="loading">
                    <h1>{loadingText}</h1>
                </section>
            )}
        </>
    );
};


export default Loading