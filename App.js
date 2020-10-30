import React, { useState } from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
import { combineReducers, createStore } from 'redux';
import mealsReducer from './store/reducers/meals';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (<AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />);
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
