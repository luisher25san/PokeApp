import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Asegúrate de haber instalado este paquete
import PokemonListItem from './PokemonListItem';  // Un componente para mostrar cada Pokémon

export default function PokemonFilter({ pokemonData }) {
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Filtrar los Pokémon por tipo cuando cambia el tipo seleccionado
  useEffect(() => {
    if (selectedType) {
      const filtered = pokemonData.filter(pokemon =>
        pokemon.types.some(typeInfo => typeInfo.type.name === selectedType)
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemonData);  // Si no se selecciona ningún tipo, mostrar todos los Pokémon
    }
  }, [selectedType, pokemonData]);

  // Definir los colores de los tipos directamente en este archivo
  const typeColors = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
  };

  // Función para obtener el color del tipo seleccionado
  const getTypeColor = (type) => typeColors[type] || '#A8A878';

  return (
    <View style={styles.container}>
      {/* Selector de tipo de Pokémon */}
      <Picker
        selectedValue={selectedType}
        style={[styles.picker, { borderColor: getTypeColor(selectedType) }]}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        <Picker.Item label="All Types" value="" />
        {Object.keys(typeColors).map((type) => (
          <Picker.Item
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            value={type}
            color={typeColors[type]}
          />
        ))}
      </Picker>

      {/* Lista de Pokémon filtrados */}
      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonListItem pokemon={item} />}
        numColumns={2}  // Organiza en 2 columnas
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
});