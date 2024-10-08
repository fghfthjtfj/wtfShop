import { useEffect, useState } from "react";

import axios from "../../axios.js";
import CardItem from "../CardItem/CardItem";
import Preloader from "../errors/Preloader.js";
import { NavLink } from "react-router-dom";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsBySearchTerm, setItemsBySearchTerm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    setItemsBySearchTerm(
      items.filter((item) => item.name.startsWith(searchTerm))
    );
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get("/items")
      .then((response) => {
        setItems(response.data);
        setItemsBySearchTerm(response.data);

        axios
          .get("/categories")
          .then((response) => {
            setAllCategories(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const getPathTitle = (id) => {
    const pathTitle = allCategories.find((el) => el._id === id);
    console.log(pathTitle)
    return pathTitle.title.toLowerCase().replace(/\s/g, "-")
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="page mx-[8.5%] mt-[20px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />

          <span className="block my-[10px] font-[Manrope] text-[18px] font-semibold">
            Results:
          </span>

          <div
            className={
              !(itemsBySearchTerm.length === 0)
                ? "grid grid-cols-2 gap-[8px]"
                : ""
            }
          >
            {!(itemsBySearchTerm.length === 0) ? (
              itemsBySearchTerm.map((el) => (
                <NavLink
                  to={`/categories/item-details/` + getPathTitle(el.category) + "/" + el._id}
                  state={{ from: getPathTitle(el.category), itemId: el._id }}
                  key={el._id}
                >
                  <CardItem
                    itemId={el._id}
                    title={el.name}
                    price={el.price}
                    image={el.photos[0]}
                    //   isFavorite={favorites[index]}
                    isAvailable={el.sizes.length === 0 ? false : true}
                    key={el._id}
                  />
                </NavLink>
              ))
            ) : (
              <div className="ml-[20px] font-[Manrope] font-light text-gray-400 text-[22px]">
                Nothing to show &#128531;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
