import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from './screens/pokemon-list';
import PokemonAR from './screens/pokemon-AR';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='PokemonList'>
                <Drawer.Screen
                    name="PokemonList"
                    component={PokemonListScreen}
                    options={{ title: 'Pokédex' }}
                />
                <Drawer.Screen
                    name="PokemonAR"
                    component={PokemonAR}
                    options={{ title: 'AR View' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}