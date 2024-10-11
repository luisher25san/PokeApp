import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import globalStyles from '../styles/globalStyles';

export default function PokemonList({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    if (loading || !nextUrl) return;
    setLoading(true);
    try {
      const response = await axios.get(nextUrl);
      const newPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokeDetail = await axios.get(pokemon.url);
          return pokeDetail.data;
        })
      );
      setPokemonList((prevList) => [...prevList, ...newPokemon]);
      setNextUrl(response.data.next);
    } catch (error) {
      console.error('Error fetching Pokémon list', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <SearchBar setPokemonList={setPokemonList} />
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} navigation={navigation} />
        )}
        numColumns={2}
        onEndReached={fetchPokemonList}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
}
