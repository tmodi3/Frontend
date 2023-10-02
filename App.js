import React, { useEffect, useState } from 'react';
import './App.css';  // Make sure this file exists or create it

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedSubBreed, setSelectedSubBreed] = useState('');
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      });
  }, []);

  const fetchImages = () => {
    setIsLoading(true);
    let url = `https://dog.ceo/api/breed/${selectedBreed}/images/random/3`;
    if (selectedSubBreed) {
      url = `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random/3`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImages(data.message);
        setIsLoading(false);
      });
  };

  const handleBreedSelect = (e) => {
    setSelectedBreed(e.target.value);
  };

  const handleSubBreedSelect = (e) => {
    setSelectedSubBreed(e.target.value);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const addToFavorites = (breed) => {
    setFavorites([...favorites, breed]);
  };

  return (
    <div className="App">
      <h1>Dog Breeds</h1>
      <select onChange={handleBreedSelect}>
        {breeds.map((breed) => (
          <option key={breed}>{breed}</option>
        ))}
      </select>
      <select onChange={handleSubBreedSelect}>
        {/* Populate this with sub-breeds if applicable */}
      </select>
      <button onClick={fetchImages}>Fetch Images</button>
      <button onClick={() => addToFavorites(selectedBreed)}>Add to Favorites</button>
      {isLoading && <div className="spinner">Loading...</div>}
      <div className="carousel">
        <button onClick={prevImage}>Prev</button>
        {images.length > 0 && <img src={images[currentIndex]} alt="dog" />}
        <button onClick={nextImage}>Next</button>
      </div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>{fav}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

