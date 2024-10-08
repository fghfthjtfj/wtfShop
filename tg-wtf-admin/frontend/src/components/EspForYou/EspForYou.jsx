import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "../../axios";
import EspForYouListItem from "./EspForYouListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import module from "./EspForYou.module.css";

const EspForYou = () => {
  const location = useLocation();

  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [esps, setEsps] = useState([]);
  const [espUserName, setEspUserName] = useState(
    state?.telegramLink ? state?.telegramLink : ""
  );
  const [espsByTelegram, setEspsByTelegram] = useState([]);

  useEffect(() => {
    setEspsByTelegram(
      esps.filter((esp) =>
        esp.user.userName.toUpperCase().startsWith(espUserName.toUpperCase())
      )
    );
  }, [espUserName, esps]);

  useEffect(() => {
    axios
      .get(`/especiallyforyouadmin`)
      .then((response) => {
        setEsps(response.data);
        setEspsByTelegram(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? ( // Show Preloader if isLoading is true
        <div className="xl:w-4/5 min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="xl:w-4/5 w-full h-full px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} text-[14px] xl:text-[26px] xl:leading-[39px] leading-3 flex xl:items-center justify-between xl:flex-row flex-col pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center xl:mb-0 mb-[10px]">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех предложений
              </span>
            </div>
            <div>
              <input
                type="text"
                value={espUserName}
                className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEspUserName(e.target.value)}
                placeholder="Введите username tg"
              />
            </div>
          </div>
          {espsByTelegram.map((esp, index) => (
            <EspForYouListItem
              key={index}
              esp={esp}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default EspForYou;
