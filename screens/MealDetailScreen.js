import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultText from '../components/DefaultText';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
import { useCallback } from 'react/cjs/react.development';

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = (props) => {
	const mealId = props.navigation.getParam('mealId');
	const availabeMeals = useSelector(state => state.meals.meals);
	const selectedMeal = availabeMeals.find(x => x.id === mealId);
	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		props.navigation.setParams({toggleFav: toggleFavoriteHandler});
	}, [toggleFavoriteHandler]);

	return (
		<ScrollView>
			<Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map((ingredient) => 
				<ListItem key={ingredient}>{ingredient}</ListItem>
			)}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map((step) => 
				<ListItem key={step}>{step}</ListItem>
			)}
		</ScrollView>
	);
};

MealDetailScreen.navigationOptions = (data) => {
	const mealTitle = data.navigation.getParam('mealTitle');
	const toggleFavorite = data.navigation.getParam('toggleFav');
	return {
		headerTitle: mealTitle,
		headerRight: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Favorite' iconName='ios-star' onPress={toggleFavorite} />
			</HeaderButtons>
		)}
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200,
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		textAlign: 'center',
		fontSize: 22,
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10,
	}
});

export default MealDetailScreen;
