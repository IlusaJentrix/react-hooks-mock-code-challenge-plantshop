import React, { useState } from 'react';

function PlantCard({ plant, onDelete }) {
  const { id, image, name, price } = plant;
  const [inStock, setInStock] = useState(true);
  const [plantPrice, setPlantPrice] = useState(price);

  const toggleStockStatus = () => {
    setInStock(!inStock);
  };

  const handleDeleteClick = () => {
    // Call the onDelete function with the plant's ID
    onDelete(id);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {plantPrice}</p>
      <button className={`success ${inStock ? 'in-stock' : 'out-of-stock'}`} onClick={toggleStockStatus}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </button>
      <button onClick={(e) => handleDeleteClick()}>
        Delete Plant
      </button>
    </li>
  );
}

export default PlantCard;
