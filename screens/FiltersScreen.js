import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import colors from '../constants/colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch value={props.state}
				trackColor={{true: colors.primary }}
				thumbColor={{true: colors.primary}}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

const FiltersScreen = (props) => {
	const { navigation } = props;

	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactorsFree, setIsLactorsFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegeterian, setIsVegeterian] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactorsFree: isLactorsFree,
			vegan: isVegan,
			vegeterian: isVegeterian,
		};

		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactorsFree, isVegan, isVegeterian]);

	useEffect(() => {
		navigation.setParams({
			save: saveFilters
		});
	}, [saveFilters]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>FiltersScreen</Text>
			<FilterSwitch
				label='Gluten-free'
				state={isGlutenFree}
				onChange={v => setIsGlutenFree(v)}
			/>
			<FilterSwitch
				label='Lactose-free'
				state={isLactorsFree}
				onChange={v => setIsLactorsFree(v)}
			/>
			<FilterSwitch
				label='Vegan'
				state={isVegan}
				onChange={v => setIsVegan(v)}
			/>
			<FilterSwitch
				label='Vegeterian'
				state={isVegeterian}
				onChange={v => setIsVegeterian(v)}
			/>
		</View>
	);
};

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item
				title="Menu"
				iconName="ios-menu"
				onPress={() => {
					navData.navigation.toggleDrawer();
				}}
			/>
			</HeaderButtons>
		)},
		headerRight: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item
				title="Save"
				iconName="ios-save"
				onPress={navData.navigation.getParam('save')}
			/>
			</HeaderButtons>
		)}
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center',
	}
});

export default FiltersScreen;
