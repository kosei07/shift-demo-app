import { useCallback } from "react";
import PrimaryButton from "../UIkit/PrimaryButton";


export default function Shiftcheck(props) {

    /*--------------react-------------*/


    const setShow = props.setShow

    const close = useCallback(() => {//shiftcheckを閉じる
        setShow(false)
    },[setShow])

    /*--------------JSX-------------*/
    if (props.show) {//日付が選択された時のみ開く
        return (
            <div className="overlay modal-center">
                <div className="content" onClick={(e) => e.stopPropagation()}>

                    <h1>{props.month}月{props.date}日</h1>
                    <table className="shiftcheck_table">
                        <thead>
                            <tr><th>名前</th><th>開始</th><th>終了</th><th>コメント</th></tr>
                        </thead>
                        <tbody>
                            {
                                props.ary.map(snapshot => {
                                    return (snapshot)
                                })
                            }
                        </tbody>
                    </table>
                    <div className="spacer_m"></div>
                    <div>
                        <PrimaryButton label={"閉じる"} color="default" onClick={close}></PrimaryButton>
                    </div>
                    <div className="spacer_s"></div>
                </div>
            </div>

        )
    } else {
        return null;
    }
}