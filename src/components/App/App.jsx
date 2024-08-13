import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import { getItems, addItems, deleteCard } from "../../utils/api";

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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
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
    return addItems({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems((items) => [res, ...items]);
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
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
