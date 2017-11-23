import React from "react";
import { StatusBar, View, Platform } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import DeckList from "./components/DeckList";
import CreateDeck from "./components/CreateDeck";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import CreateCard from "./components/CreateCard";
import { Constants } from "expo";
import { primary_dark, primary, white } from "./utils/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <Header backgroundColor={primary} barStyle="light-content" />
          <StackNav />
        </View>
      </Provider>
    );
  }
}

function Header({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const TabsNav = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="notebook" size={30} color={tintColor} />
        )
      }
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="plus" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? primary : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : primary,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const StackNav = StackNavigator({
  Home: {
    screen: TabsNav
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckId}`
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckId} Quiz`
    })
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: {
      title: "New Question"
    }
  }
});
