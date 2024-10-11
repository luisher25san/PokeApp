import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import globalStyles from '../styles/globalStyles';

export default function SearchBar({ setPokemonList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const searchPokemon = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const filtered = response.data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectPokemon = async (pokemonUrl) => {
    const response = await axios.get(pokemonUrl);
    setPokemonList([response.data]); // Mostramos solo el Pokémon seleccionado
    setSearchResults([]);
    setQuery('');
  };

  return (
    <View>
      <TextInput
        style={globalStyles.searchInput}
        placeholder="Buscar Pokémon"
        value={query}
        onChangeText={searchPokemon}
      />
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectPokemon(item.url)}>
              <Text style={globalStyles.searchResult}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
