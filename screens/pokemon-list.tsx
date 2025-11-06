import React from 'react';
import { getPokemonList } from '../pokeAPI/pokeApi';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import PokemonDataCard from './pokemon-data-card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'POKEMON_LIST_CACHE';

export default function PokemonListScreen() {
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);
  const [previousUrl, setPreviousUrl] = React.useState<string | null>(null);
  const [nextUrl, setNextUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  async function fetchPokemonList(url?: string | null, forceRefresh = false) {
    setLoading(true);
    setError(null);

    const cacheKey = url ? `${CACHE_KEY}_${url}` : CACHE_KEY;
    try {
    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Invalidate cache after 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setPokemonList(data.results);
          setPreviousUrl(data.previous);
          setNextUrl(data.next);
          setLoading(false);
          return;
        }
      }
    }

      const data = await getPokemonList(url);
      setPokemonList(data.results);
      setPreviousUrl(data.previous);
      setNextUrl(data.next);

      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      setError('Failed to load Pokémon. Please try again.');
    }
    setLoading(false);
  }

  React.useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            fetchPokemonList(null, true);
            setRefreshing(false);
        }} 
        colors={['#1976d2']}/>
    }>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={80} color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: 'red', fontSize: 18, marginBottom: 12 }}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={() => fetchPokemonList()}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, !previousUrl && styles.buttonDisabled]}
              onPress={() => fetchPokemonList(previousUrl)}
              disabled={!previousUrl}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go to previous Pokémon page"
              accessibilityState={{ disabled: !previousUrl }}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !nextUrl && styles.buttonDisabled]}
              onPress={() => fetchPokemonList(nextUrl)}
              disabled={!nextUrl}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go to next Pokémon page"
              accessibilityState={{ disabled: !nextUrl }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {pokemonList.map(pokemon => (
              <PokemonDataCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                onPress={() => console.log('Clicked:', pokemon.name)}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#b0b0b0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300, // ensures vertical centering even if ScrollView is short
  },
});