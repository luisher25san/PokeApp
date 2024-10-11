import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function PokemonCard({ pokemon, navigation }) {
  const [rotateValue] = useState(new Animated.Value(0));

  const getBorderColor = (types) => {
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
    return typeColors[types[0].type.name] || '#000';
  };

  const rotatePokemon = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(0);
    });
  };

  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[globalStyles.pokemonCard, { borderColor: getBorderColor(pokemon.types), transform: [{ rotateY: rotateAnimation }] }]}>
      <TouchableOpacity onPress={() => rotatePokemon()}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={globalStyles.pokemonImage}
        />
        <Text style={globalStyles.pokemonName}>{pokemon.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[globalStyles.moreButton, { backgroundColor: getBorderColor(pokemon.types) }]}
        onPress={() => navigation.navigate('PokemonDetails', { pokemon })}
      >
        <Text style={globalStyles.moreButtonText}>Ver Más</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
