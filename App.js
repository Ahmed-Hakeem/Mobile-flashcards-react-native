import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Decks from "./components/Decks";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";

import { setLocalNotification } from "./utils/helpers";

const Store = createStore(reducers, middleware);

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Decks"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Decks"
        component={Decks}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Flash Cards" }}
      />
    </Stack.Navigator>
  );
}

const Stack2 = createStackNavigator();

function RootStack2() {
  return (
    <Stack2.Navigator
      initialRouteName="AddDeck"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack2.Screen
        name="AddDeck"
        component={AddDeck}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{ title: "Flash Cards" }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Flash Cards" }}
      />
    </Stack2.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
          margin: 0,
          padding: 0,
        },
        style: {
          height: 80,
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Decks"
        component={RootStack}
        options={{
          tabBarIcon: () => <AntDesign name="book" size={40} color="#F5F5F5" />,
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={RootStack2}
        options={{
          tabBarIcon: () => (
            <Entypo name="squared-plus" size={40} color="#F5F5F5" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer style={{ flex: 1 }}>
          {MyTabs()}
        </NavigationContainer>
      </Provider>
    );
  }
}
