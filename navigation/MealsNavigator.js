import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import colors from "../constants/colors";
import { Platform, Text } from 'react-native';
import FavouritesScreen from '../screens/FavouritesScreen';
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStactNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
	headerTitle: 'A Screen'
};

const MealsNavitator = createStackNavigator({
	Categories: {
		screen: CategoriesScreen,
	},
	CategoryMeals: {
		screen: CategoryMealsScreen,
	},
	MealDetail: {
		screen: MealDetailScreen,
	},
}, {
	defaultNavigationOptions: defaultStactNavOptions
});

const FavNavigator = createStackNavigator({
	Favorites: FavouritesScreen,
	MealDetail: MealDetailScreen,
}, {
	defaultNavigationOptions: defaultStactNavOptions
});

const tabScreenConfig = {
	Meals: {
		screen: MealsNavitator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>) : ('Meals')
		}
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: colors.accent,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>) : ('Favorites')
		}
	}
};

const MealsFavTabNavigator = Platform.OS =='android' ?
	createMaterialBottomTabNavigator(tabScreenConfig, {
		activeColor: colors.accent,
		shifting: true,
	}) :
	createBottomTabNavigator(
		tabScreenConfig,
		{
			tabBarOptions: {
				activeTintColor: colors.accent,
			}
		}
	);

const FiltersNavigator = createStackNavigator({
	Filters: FiltersScreen
});

const MainNavigator = createDrawerNavigator({
	MealsFavs: {
		screen: MealsFavTabNavigator,
		navigationOptions: {
			drawerLabel: 'Meals'
		}
	},
	Filters: FiltersNavigator
}, {
	contentOptions: {
		activeTintColor: colors.accent,
		labelStyle: {
		  fontFamily: 'open-sans-bold'
		}
	}
});

export default createAppContainer(MainNavigator);
