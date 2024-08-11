import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleChange = (e) => {
    if (currentTempUnit === "F") setCurrentTempUnit("C");
    if (currentTempUnit === "C") setCurrentTempUnit("F");
  };

  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-f"
            : "switch__slider switch__slider-c"
        }
      ></span>
      <p
        className={`switch__temp-f ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-c ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
