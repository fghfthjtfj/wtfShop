import "./CardItem.css";

import LikeIcon from "../../images/liked-icon.svg";
import { useState } from "react";

const CardItem = ({ title, price, image, isFavorite, isAvailable }) => {

  return (
    <>
      <div className="card-item">
        <div className="relative">
          <img
            src={image}
            className={isAvailable ? "w-[150px] h-[210px]" : "card-item-img-blur w-[150px] h-[210px]"}
          />
          {isFavorite ? (
            <div className="liked absolute bottom-[10%] left-[10%] w-[36px] h-[36px] flex justify-center items-center">
              <img
                width={11}
                height={11}
                src={LikeIcon}
                className={isAvailable ? "" : "card-item-img-blur"}
              />
            </div>
          ) : (
            ""
          )}
          {!isAvailable ? (
            <div className="absolute flex justify-center items-center top-[0] bottom-[0] right-[0] left-[0]">
              <div className="item-not-found px-[20px] py-[5px]">
                Not Found
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card-item-title">{title}</div>
        {price !== null ? <div className="card-item-price">{price}$</div> : ''}
      </div>
    </>
  );
};

export default CardItem;
