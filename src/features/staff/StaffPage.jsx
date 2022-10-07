import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calender } from "../common/components/index";
import { fetchSubmissionPeriod } from "../../reducks/period/operations";
import { getPeriod } from "../../reducks/period/selectors";
import { fetchMyMonthData } from "../../reducks/shift/operations";
import { getUserData } from "../../reducks/users/selectors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { PrimaryButton } from "../../UIkit/index";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import Image1 from "../../assets/image/image1.jpeg";
import Image2 from "../../assets/image/image2.jpeg";
const color_red = {
  color: "red",
};
const color_black = {
  color: "black",
};

const Staffpage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_data = getUserData(selector);
  const period = getPeriod(selector);
  const name = user_data.name;
  const id = user_data.id;
  const isSubmitted = user_data.isSubmitted;
  const [show, setShow] = useState(true);

  function fetchMyMonthDataFunction(month, name) {
    //スタッフのシフト情報を取得
    dispatch(fetchMyMonthData(month, name));
    dispatch(fetchSubmissionPeriod());
  }

  useEffect(() => {
    dispatch(fetchSubmissionPeriod()); //提出可能期間の取得
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickHelp = () => {
    //「使い方」を押した時の処理
    setShow(true);
  };

  return (
    <main className="main_wrap">
      <div className="spacer_m"></div>
      <div className="stack_wrap">
        <div className="stack">
          <Stack direction="row" spacing={1}>
            <Chip
              label="使い方"
              onClick={onClickHelp}
              icon={<HelpOutlineIcon />}
              variant="outlined"
            />
          </Stack>
        </div>
      </div>
      <div className="staffpage_top_outside">
        <h2 className="margin_padding_0 text_center">{name} さん</h2>
        <div className="staffpage_top_inside">
          <h5 className="margin_padding_0">
            {period.begin}~{period.end}　:　
          </h5>
          <h5
            style={isSubmitted ? color_black : color_red}
            className="margin_padding_0"
          >
            {isSubmitted ? "提出済み" : "未提出"}
          </h5>
        </div>
      </div>
      <div className="spacer_s"></div>
      <Calender
        name={name}
        id={id}
        period={period}
        isStaffpage={true}
        isSubmitted={isSubmitted}
        fetchFunction={fetchMyMonthDataFunction}
      />
      <StaffHelp show={show} setShow={setShow} />
    </main>
  );
};

export default Staffpage;

SwiperCore.use([Navigation]);

export const StaffHelp = (props) => {
  const close = () => {
    props.setShow(false);
  };
  if (props.show) {
    //日付が選択された時のみ開く
    return (
      <div className="overlay modal-center">
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <div className="spacer_l"></div>
          <div className="hero-section">
            <Swiper
              navigation={true}
              pagination={true}
              modules={[Navigation, Pagination]}
              className="swiper"
            >
              <SwiperSlide className="swiper_slider">
                <h3>使用方法</h3>
                <div className="swiper_content">
                  <p>
                    カレンダーの日付を選択し、提出内容が確定したら画面右下の「提出する」を押してください。
                  </p>
                  <p>
                    提出内容は「提出する」を押した後でも何度でも変更できます。
                  </p>
                  <p>
                    提出内容の変更後、「提出する」を押さずに月を移動することはできません。
                  </p>
                  <p>
                    また指定されている期間内(日付の背景が白色)にシフトに入れない場合も一度「提出する」を押してください。
                  </p>
                  <div className="text_center">
                    <p>1/3</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper_slider">
                <h3>（提出例）正社員・パートの方</h3>
                <img src={Image1} alt="" className="swiper_image" />
                <div className="text_center margin_padding_0">
                  <p className="margin_padding_0">2/3</p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper_slider">
                <h3>（提出例）バイト生の方</h3>
                <img src={Image2} alt="" className="swiper_image" />
                <div className="text_center">
                  <p>3/3</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="spacer_m"></div>
          <div className="multiple_buttons_wrap">
            <PrimaryButton
              label={"閉じる"}
              color="default"
              onClick={close}
            ></PrimaryButton>
          </div>
          <div className="spacer_l"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
