import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
//import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState(
    "C"
    //CurrentTemperatureUnitContext
  );

  const handleChange = (e) => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };

  // const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  // useEffect(
  //   () => setIsChecked(currentTemperatureUnit === "C"),
  //   [currentTemperatureUnit]
  // );

  console.log(currentTemperatureUnit);

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          className="toggle-switch__checkbox"
          type="checkbox"
          name="toggle-switch-checkbox"
          //checked={isChecked}
          value={currentTemperatureUnit}
          onChange={handleChange}
        />
        <span
          className={
            currentTemperatureUnit === "F"
              ? "toggle-switch__slider toggle-switch__slider-F"
              : "toggle-switch__slider toggle-switch__slider-C"
          }
        ></span>
        <p
          className={`toggle-switch__temp-F ${
            currentTemperatureUnit === "F" && "toggle-switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`toggle-switch__temp-C ${
            currentTemperatureUnit === "C" && "toggle-switch__active"
          }`}
        >
          C
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
