import React, { useRef } from 'react'; // Asegúrate de importar useRef
import { View, Text, Image, StyleSheet, ScrollView,Animated,Button } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { Linking, TouchableOpacity } from 'react-native';

export default function PokemonDetails({ route }) {
  const { pokemon } = route.params;

  const getCardColor = (types) => {
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
    return typeColors[types[0].type.name] || '#A8A878';
  };
  const rotateValue = useRef(new Animated.Value(0)).current; // Inicializa el valor de rotación

   const rotatePokemon = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(0); // Reinicia la rotación
    });
  };



  const cardColor = getCardColor(pokemon.types);
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotación completa
  });

  
  return (
    <ScrollView contentContainerStyle={[styles.card, { borderColor: cardColor }]}>
      {/* Imagen del Pokémon */}
      <View style={styles.imageContainer}>
      <TouchableOpacity onPress={rotatePokemon}>
          <Animated.Image
            source={{ uri: pokemon.sprites.front_default }}
            style={[styles.pokemonImage, { transform: [{ rotate: rotateInterpolate }] }]} // Aplica la rotación
          />
        </TouchableOpacity>
      </View>
      
      {/* Nombre del Pokémon */}
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>

      {/* Tipo del Pokémon */}
      <View style={styles.typeContainer}>
        {pokemon.types.map((typeInfo, index) => (
          <Text key={index} style={[styles.pokemonType, { backgroundColor: getCardColor([typeInfo]) }]}>
            {typeInfo.type.name.toUpperCase()}
          </Text>
        ))}
      </View>

      {/* Línea separadora después del tipo */}
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />

      {/* Detalles del Pokémon */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Height:</Text>
        <Text style={styles.detailValue}>{pokemon.height} dm</Text>
        
        <Text style={styles.detailLabel}>Weight:</Text>
        <Text style={styles.detailValue}>{pokemon.weight} hg</Text>
      </View>

      {/* Línea separadora después de los detalles */}
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />

      {/* Descripción (Simulación) */}
      <Text style={styles.description}>
      <Text style={{ color: cardColor}}>{pokemon.name}</Text> is a powerful Pokémon known for its <Text style={{ color: cardColor}}>{pokemon.types[0].type.name} </Text>abilities. It can {pokemon.abilities[0].ability.name}, 
        making it a fierce competitor in battles.
      </Text>

      {/* Línea separadora final */}
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />
      {/* Descripción (Simulación) */}
      <Text style={styles.description}>
      Esta aplicación está desarrollada por: <Text onPress={() => Linking.openURL('https://www.linkedin.com/in/luis-carlos-hern%C3%A1ndez-sandoval-1ba20627a/')}><Text style={{ color: cardColor }}>Luis Carlos Hernandez Sandoval</Text>  </Text> Número de Control: <Text style={{ color: cardColor }}>20540371</Text>
      </Text>
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />
      <Text style={styles.description}>
       <Text onPress={() => Linking.openURL('https://github.com/luisher25san')}><Text style={{ color: cardColor }}>Github</Text></Text> 
      </Text>
      <View style={[styles.separator, { borderBottomColor: cardColor }]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTopTop: 100,
    marginBottomBottom:100,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 40,
    borderWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
    paddingBottom: 0,
  },
  imageContainer: {
    marginBottom: 20,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  pokemonType: {
    marginHorizontal: 7,
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginButtom: 2,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 18,
    color: '#555',
  },
  description: {
    marginTop: 2,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  separator: {
    width: '90%',
    borderBottomWidth: 2,
    marginVertical: 10,
  },
});