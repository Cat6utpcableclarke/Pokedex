import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type PokemonCardProps = {
    name: string;
    url: string;
    onPress?: () => void;
}

export default function PokemonDataCard({ name, url, onPress }: PokemonCardProps) {
    const pokemonId = url.split('/').filter(Boolean).pop();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${name}`}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: imageUrl }} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.id}>#{pokemonId?.padStart(3, '0')}</Text>
                <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        width: '45%',
        alignItems: 'center',
    },
    imageContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: 100,
        height: 100,
    },
    infoContainer: {
        alignItems: 'center',
    },
    id: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});