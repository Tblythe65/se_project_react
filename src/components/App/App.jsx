import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import { getItems, addItems, deleteCard } from "../../utils/api";
import { signIn, signUp, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    addItems({ name, imageUrl, weather })
      .then((items) => {
        setClothingItems([items, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    deleteCard(selectedCard._id)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => {
          return card._id !== selectedCard._id;
        });
        setClothingItems(filteredCards);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignUp = (data) => {
    signUp(data)
      .then((res) => {
        handleLogIn(res);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogIn = (data) => {
    signIn(data)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

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
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
          handleCardDelete={handleCardDelete}
        />
        <RegisterModal
          onClose={closeActiveModal}
          isOpen={activeModal === "signup"}
          onSignUp={handleSignUp}
        />
        <LoginModal
          onClose={closeActiveModal}
          isOpen={activeModal === "signin"}
          onSignIn={handleLogIn}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
