import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
//Modal Imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
//Context Imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
//Utils Imports
import {
  getWeather,
  getWeatherType,
  filterWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
//Other Imports
import { getItems, addItem, deleteItem } from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt("");
    setIsLoggedIn(false);
  };

  const handleCardClick = (card) => {
    console.log("Card being set as selectedCard:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegister = (name, avatar, email, password) => {
    console.log("Setting active modal to register");
    setActiveModal("register");
    return register(name, avatar, email, password)
      .then((res) => {
        console.log("User registered:", res);
        return handleLogin(email, password);
      })
      .catch((error) => {
        console.error("Registration failed", error);
      });
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLogin = (email, password) => {
    console.log("Setting active modal to login");
    setActiveModal("login");
    return login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setJwt(res.token);
        setIsLoggedIn(true);
      })
      .catch((error) => console.error("Login failed", error));
  };

  const handleAddClick = () => {
    console.log("Add Clothes button clicked!");
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
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting card:", err));
  };

  useEffect(() => {
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("jwt");
        });
    }
  }, [jwt]);

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              onLogout={handleLogout}
            />

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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems.filter(
                        (item) => currentUser && item.owner === currentUser?._id
                      )}
                      handleCardDelete={handleCardDelete}
                      handleAddClick={handleAddClick}
                      //handleAddNewClick={handleAddNewClick}
                    />
                  </ProtectedRoute>
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
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              handleCloseClick={closeActiveModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onRegisterClick={handleRegisterClick}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
