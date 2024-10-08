import { NavLink } from "react-router-dom";

const CarouselSecondSlide = ({ imageSrc, title }) => {
  let path = "categories/" + title.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="CarouselSecondSlide">
      <NavLink to={path} state={{category: title, pathTitle: title.toLowerCase().replace(/\s/g, "-")}}>
        <div className="relative ">
            <img src={imageSrc} alt="1" className="w-[150px] h-[210px]" style={{borderRadius: 25}} />
            <div className="bg-blue text-white px-[2px] py-[4px] flex justify-center items-center absolute top-[152px] -left-[22px]">
            {title}
            </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CarouselSecondSlide;
