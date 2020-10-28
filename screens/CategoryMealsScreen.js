import React from 'react';
import MealList from '../components/MealList';

import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealsScreen = (props) => {
	const catId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter(
	  meal => meal.categoryIds.indexOf(catId) >= 0
	);

	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
	const selectedCategory = CATEGORIES.find(x => x.id === navigationData.navigation.getParam('categoryId'));
	return {
		headerTitle: selectedCategory.title,
	};
};

export default CategoryMealsScreen;
