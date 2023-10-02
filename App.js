import logo from './logo.svg';
import './App.css';

import React, 
{ useEffect, useState } from 'react';

function App() {
const [selectedBreed, setSelectedBreed] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedBreed) {
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/4`)
        .then(response => response.json())
        .then(data => {
          setImages(data.message);
        });
    }
  }, [selectedBreed]);

  return (
    <div className="App">
      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option>Select a breed</option>
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={selectedBreed} />
        ))}
      </div>
    </div>
  );
}

export default App;
