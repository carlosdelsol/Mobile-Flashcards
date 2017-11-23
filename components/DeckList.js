import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { fetchData, STORAGE_KEY, setInitialData } from "./../actions";
import { connect } from "react-redux";
import Deck from "../components/Deck";
import {
  gray,
  secundary,
  secundary_text,
  black,
  white,
  primary_dark,
  primary_light
} from "./../utils/colors";

class DeckList extends React.Component {
  componentDidMount = () => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(results => {
        return results === null ? setInitialData() : JSON.parse(results);
      })
      .then(decks => {
        this.props.fetchData(decks);
      });
  };

  deckItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.deckItem}
        key={item.title}
        onPress={() =>
          this.props.navigation.navigate("Deck", { deckId: item.title })
        }
      >
        <View style={styles.deckContainer}>
          <View style={styles.containerBottom}>
            <View style={styles.buttonContainer}>
              <Text style={styles.deckTitle}>{item.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.deckCard}>{item.questions.length} cards</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { decks } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks}
          renderItem={this.deckItem}
          keyExtractor={(item, index) => {
            return item.title;
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(data) {
  let decks = [];
  Object.keys(data).map((key, index) => {
    let deck = data[key];
    decks.push(deck);
  });

  return {
    decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: data => dispatch(fetchData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

const styles = StyleSheet.create({
  deckContainer: {
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    borderColor: primary_dark,
    borderWidth: 2,
    alignSelf: "center",
    backgroundColor: white
  },
  containerBottom: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1
  },
  deckItem: {
    flex: 1,
    alignItems: "center",
    borderColor: gray
  },
  deckTitle: {
    color: primary_dark,
    fontSize: 20,
    alignSelf: "center"
  },
  deckCard: {
    color: primary_light,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
