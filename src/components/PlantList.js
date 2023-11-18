import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';

function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []); // Fetch plants on component mount

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:3000/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const handleDelete = async (deletedPlantId) => {
    try {
      const response = fetch(`http://localhost:3000/plants/${deletedPlantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Plant deleted successfully.');
        // Update the local state by filtering out the deleted plant
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== deletedPlantId));
      } else {
        console.error('Failed to delete plant on the backend');
      }
    } catch (error) {
      console.error('An error occurred while deleting the plant:', error);
    }
  };

  return (
    <ul className="cards">
      {plants.length > 0 ? (
        plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} />
        ))
      ) : (
        <p>No plants available.</p>
      )}
    </ul>
  );
}

export default PlantList;
