import React, { useState, useEffect } from "react";
// import usePokemon from "./usePokemon";

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectPokemon, setSelectPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2024-12-17/data_153140.plain");
        const data = await response.json();
        setPokemonList(data.results);
        setSelectPokemon(data.results[0].name); 
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (selectPokemon) {
        setLoading(true);
        try {
          const response = await fetch("https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2024-12-17/data_153140.plain");
          const data = await response.json();
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
          setLoading(false);
        }
      }
    };

    fetchPokemonDetails();
  }, [selectPokemon]);

  const handleNext = () => {
    const currentIndex = pokemonList.findIndex((pokemon) => pokemon.name === selectPokemon);
    if (currentIndex < pokemonList.length - 1) {
      setSelectPokemon(pokemonList[currentIndex + 1].name);
    }
  };

  const handlePrevious = () => {
    const currentIndex = pokemonList.findIndex((pokemon) => pokemon.name === selectPokemon);
    if (currentIndex > 0) {
      setSelectPokemon(pokemonList[currentIndex - 1].name);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <select
        value={selectPokemon}
        onChange={(e) => setSelectPokemon(e.target.value)}
        style={{ padding: "10px", fontSize: "12px" }}
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>

     

      <div style={{ margin: "15px 0" }}>
        <img src=''/>
        <button onClick={handlePrevious}
          disabled={pokemonList.findIndex((pokemon) => pokemon.name === selectPokemon) === 0}
          style={{
            padding: "5px 10px",
            margin: "5px 10px",
            
          }}
        >
          Previous
        </button>

        
        <button
          onClick={handleNext}
          disabled={
            pokemonList.findIndex((pokemon) => pokemon.name === selectPokemon) ===
            pokemonList.length - 1
          }
          style={{
            padding: "5px 10px",
            margin: "5px 10px",
          }}
        >
          Next
        </button>
      </div>

      
      {loading ? (
        <p>Fetching Data...</p>
      ) : pokemonData ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>{pokemonData.name.toLowerCase()}</h2>
          <img src={pokemonData.image} alt={pokemonData.name} style={{ width: "150px" }} />
          <p>{pokemonData.description}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PokemonPage;
