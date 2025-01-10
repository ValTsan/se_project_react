import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import {
  getWeather,
  getWeatherType,
  filterWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    console.log("Button card clicked!");
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    console.log("Button clicked!");
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onAddItem = (values) => {
    console.log(values);
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const processedData = filterWeatherData(data);
        console.log(processedData);
        setWeatherData(processedData);
      })
      .catch(console.error);
  }, []);

  console.log(currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  weatherTemp={temp}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleCloseClick={closeActiveModal}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
