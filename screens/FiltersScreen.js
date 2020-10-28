import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const FiltersScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>FiltersScreen</Text>
		</View>
	);
};

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: () => {
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item
				title="Menu"
				iconName="ios-menu"
				onPress={() => {
					navData.navigation.toggleDrawer();
				}}
			/>
			</HeaderButtons>
		}
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default FiltersScreen;
