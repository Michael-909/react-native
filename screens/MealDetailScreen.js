import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = (props) => {
	const mealId = props.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(x => x.id === mealId);

	return (
		<View style={styles.screen}>
			<Text>{selectedMeal.title}</Text>
            <Button title="Go Back to Gategories" onPress={() => {props.navigation.popToTop()}} />
		</View>
	);
};

MealDetailScreen.navigationOptions = (data) => {
	const selectedMeal = MEALS.find(x => x.id === data.navigation.getParam('mealId'));
	return {
		headerTitle: selectedMeal.title,
		headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item title='Favorite' iconName='ios-star' onPress={() => {}} />
		</HeaderButtons>)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default MealDetailScreen;
