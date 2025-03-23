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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
import {
  getItems,
  addItem,
  deleteItem,
  updateCurrentUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import auth from "../../utils/auth";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = ({ name, email, password, avatar }) => {
    console.log("Starting registration process...");
    const makeRequest = () =>
      auth.register({ name, avatar, email, password }).then((res) => {
        {
          console.log("Registration successful:", res);
          console.log("Attempting automatic login with:", { email, password });
          handleLogin({ email, password });
        }
        return res;
      });
    handleSubmit(makeRequest);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    console.log("Starting login process...");
    const makeRequest = () => {
      return auth.login({ email, password }).then((res) => {
        console.log(
          "Login successful, received token:",
          res.token ? "Token exists" : "No token"
        );
        localStorage.setItem("jwt", res.token);
        setJwt(res.token);
        setIsLoggedIn(true);
        console.log("Login state updated, closing modal...");
      });
    };
    handleSubmit(makeRequest);
  };

  const handleUpdateCurrentUser = ({ name, avatar }) => {
    const makeRequest = () =>
      updateCurrentUser({ name, avatar }).then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      });
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const makeRequest = () => {
      const likeRequest = !isLiked ? addCardLike(id) : removeCardLike(id);
      return likeRequest.then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleAddClick = () => {
    console.log("Add Clothes button clicked!");
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

  const handleAddItemSubmit = (item) => {
    const makeRequest = () =>
      addItem(item).then((newItem) => {
        console.log("New Item Added:", newItem);
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
      });
    handleSubmit(makeRequest);
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

    const makeRequest = () =>
      deleteItem(cardId).then(() => {
        console.log("Deleting card with ID:", selectedCard._id);
        setClothingItems((items) =>
          items.filter((item) => item.id !== cardId && item._id !== cardId)
        );
        setSelectedCard(null);
      });
    handleSubmit(makeRequest);
  };

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
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
              userName={currentUser?.name}
              userAvatar={currentUser?.avatar}
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
                    handleCardLike={handleCardLike}
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
                      onUpdateUser={handleUpdateCurrentUser}
                      onEditProfileClick={() => setActiveModal("edit-profile")}
                      handleCardLike={handleCardLike}
                      onLogout={handleLogout}
                      currentUser={currentUser}
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
              onLoginClick={handleLoginClick}
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
          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateCurrentUser}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
