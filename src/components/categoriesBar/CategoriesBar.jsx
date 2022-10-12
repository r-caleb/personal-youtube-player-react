import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";

const keywords = [
  "Tout",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Rap",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("Tout");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "Tout") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
