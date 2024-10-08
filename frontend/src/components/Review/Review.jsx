import message from "../../images/message.svg";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "../errors/Preloader.js";
import "./Review.css";
import ReviewStars from "./ReviewStars.jsx";
import { selectedstars } from "./ReviewStars.jsx";

const Review = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [selectedstars, setSelectedStars] = useState(1);
  const [text, setText] = useState(null);

  let location = useLocation();
  const { state } = location;
  let navigate = useNavigate();

  let tg = window.Telegram.WebApp;

  let userid = "";

  if (!tg.initDataUnsafe.user) {
    userid = "703999322";
  } else {
    userid = tg.initDataUnsafe.user?.id;
  }

  const handlerConfirm = () => {
    setIsSending(true);
    axios
      .post("/itemreview", {
        ratingsCount: selectedstars,
        textReview: text,
        telegramId: userid,
        itemId: state.itemId,
      })
      .then((response) => {
        setIsSending(false);
        navigate("/account/history", {state: {amount:state.amount}});
      })

      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  };

  return (
    <div className="mx-[8.5%] mt-[24px] page">
      <div className="flex gap-[10px] items-center">
        <img src={message} alt="1" className="w-[40px] h-[40px]" />
        <div className="flex justify-between w-full items-center">
          <div className="PlacingTextTitle">
            <div className="flex flex-col kkff ">
              <div>Review</div>
            </div>
          </div>
        </div>
      </div>
      <div className="formOrderPlacingStage1 flex flex-col gap-[16px] mt-[20px]">
        <div className="flex flex-col gap-[8px]">
          <ReviewStars
            selectedstars={selectedstars}
            setSelectedStars={setSelectedStars}
          />
        </div>
        <div className="textarea2 flex flex-col gap-[8px]">
          <div>
            <label htmlFor="TextReview">Your Feedback</label>
            <textarea
              placeholder="I really liked this!"
              id="TextReview"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-[60px]">
          <div
            disabled={isSending}
            onClick={handlerConfirm}
            className={`cursor-pointer nextPageButton w-[75%] flex items-center justify-center ${
              isSending ? "buttonnextESPdisbaled" : ""
            } `}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
