import React, { useState } from "react";

function NewPlantForm() {
  const [plantData, setPlantData] = useState({
    name: "",
    image: "",
    price: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Plant added successfully:", data);
        // Handle the new plant data as needed
        // For example, you can update the UI or perform other actions
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };
  
  



  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={plantData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={plantData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={plantData.price}
          onChange={handleChange}
        />
       <button type="button" onClick={handleSubmit}>
          Add Plant
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;
