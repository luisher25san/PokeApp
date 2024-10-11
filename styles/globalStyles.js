import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  pokemonCard: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  pokemonName: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  moreButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    borderColor: '#ff0000',
    borderWidth: 3,
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
  },
  searchResult: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  detailContainer: {
    padding: 20,
    alignItems: 'center',
  },
  pokemonImageLarge: {
    width: 150,
    height: 150,
  },
});
