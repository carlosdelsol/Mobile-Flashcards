import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import {
  primary,
  primary_light,
  primary_dark,
  white,
  gray
} from "./../utils/colors";
import { connect } from "react-redux";
import { fetchData } from "./../actions";

class Deck extends React.Component {
  render() {
    const { deck, navigation } = this.props;

    return (
      <View>
        <View style={styles.deckContainer}>
          <View style={styles.containerBottom}>
            <View style={styles.buttonContainer}>
              <Text style={styles.deckName}>{deck.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.deckCardsNumber}>
                {deck.questions.length} cards
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                deck.questions.length == 0
                  ? [styles.deckButton, styles.quizButton, styles.disabled]
                  : [styles.deckButton, styles.quizButton]
              }
              disabled={deck.questions.length == 0}
              onPress={() =>
                navigation.navigate("Quiz", { deckId: deck.title })
              }
            >
              <Text style={styles.quizButtonText}>Start a Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.deckButton, styles.addCardButton]}
              onPress={() =>
                navigation.navigate("CreateCard", { deckId: deck.title })
              }
            >
              <Text style={styles.addCardButtonText}>Create New Question</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  return {
    decks,
    deck: decks[props.navigation.state.params.deckId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: data => dispatch(fetchData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

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
  deck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deckName: {
    color: primary_dark,
    fontSize: 20,
    alignSelf: "center"
  },
  deckCardsNumber: {
    color: primary_light,
    fontWeight: "bold",
    alignSelf: "center"
  },
  deckButton: {
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    width: 170,
    borderColor: primary_dark,
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: primary
  },
  quizButton: {
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    borderColor: primary_dark,
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: primary
  },
  addCardButton: {
    backgroundColor: white,
    borderColor: primary
  },
  disabled: {
    backgroundColor: primary_light
  },
  quizButtonText: {
    color: white,
    textAlign: "center"
  },
  addCardButtonText: {
    color: primary,
    textAlign: "center"
  }
});
