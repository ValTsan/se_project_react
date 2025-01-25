import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import {
  getWeather,
  getWeatherType,
  filterWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    console.log("Card being set as selectedCard:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };

  const handleAddNewClick = () => {
    console.log("Add New button clicked");
    setActiveModal("add-new");
  };

  const closeActiveModal = () => {
    console.log("Button clicked!");
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (item) => {
    return addItem(item)
      .then((newItem) => {
        console.log("New Item Added:", newItem);
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    console.log("SelectedCard at delete time:", selectedCard);
    if (
      !selectedCard ||
      selectedCard._id === undefined ||
      selectedCard._id === null
    ) {
      console.error("No card selected or ID is undefined");
      return;
    }

    const cardId = selectedCard._id;

    console.log("Deleting card with ID:", selectedCard._id);

    deleteItem(cardId)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item.id !== cardId && item._id !== cardId)
        );
        setSelectedCard(null);
        setActiveModal("");
      })
      .catch((err) => console.error("Error deleting card:", err));
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

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                  onAdd
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleCloseClick={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
        )}

        {activeModal === "add-new" && (
          <AddItemModal
            isOpen={activeModal === "add-new"}
            handleCloseClick={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            onClick={handleCardDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
