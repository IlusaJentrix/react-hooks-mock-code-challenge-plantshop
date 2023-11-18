import React, { useState,useEffect } from 'react';
import Search from './Search'; // Adjust the path based on your project structure
import PlantCard from './PlantCard'; // Adjust the path based on your project structure

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []); // Fetch plants on component mount

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:3000/plants');
      const data = await response.json();
      setPlants(data);
      setFilteredPlants(data); // Initialize filteredPlants with all plants
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const handleDelete =  (deletedPlantId) => {
    try {
      const response =  fetch(`http://localhost:3000/plants/${deletedPlantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Plant deleted successfully.');
        // Update the local state by filtering out the deleted plant
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== deletedPlantId));
        setFilteredPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== deletedPlantId));
      } else {
        console.error('Failed to delete plant on the backend');
      }
    } catch (error) {
      console.error('An error occurred while deleting the plant:', error);
    }
  };

  const handleSearch = (query) => {
    // Update filteredPlants based on the search query
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <ul className="cards">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} />
          ))
        ) : (
          <p>No matching plants found.</p>
        )}
      </ul>
    </div>
  );
}

export default PlantList;
