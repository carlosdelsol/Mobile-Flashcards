import React from "react";
import { addCard, createCard } from "./../actions";
import { connect } from "react-redux";
import {
  primary,
  primary_light,
  primary_dark,
  white,
  red
} from "./../utils/colors";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

class CreateCard extends React.Component {
  state = {
    question: null,
    answer: null
  };

  handleAddCard = () => {
    const { deck } = this.props;
    const { question, answer } = this.state;
    this.props.createCard(deck, { question, answer });
    this.props.navigation.navigate("Deck", { deckId: deck.title });
    this.setState(() => ({
      question: null,
      answer: null
    }));
  };

  handleAnswerChange = answer => {
    this.setState(() => ({ answer }));
  };

  handleQuestionChange = question => {
    this.setState(() => ({ question }));
  };

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Question"
          value={question}
          onChangeText={this.handleQuestionChange}
        />
        {!question && (
          <Text style={{ color: red, fontSize: 12, marginTop: 5 }}>
            Mandatory *
          </Text>
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Answer"
          value={answer}
          onChangeText={this.handleAnswerChange}
        />
        {!answer && (
          <Text style={{ color: red, fontSize: 12, marginTop: 5 }}>
            Mandatory *
          </Text>
        )}
        <TouchableOpacity
          style={
            !question || !answer
              ? [styles.button, styles.disabled]
              : styles.button
          }
          onPress={this.handleAddCard}
          disabled={!question || !answer}
        >
          <Text style={{ color: white }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  const deck = decks[props.navigation.state.params.deckId];
  return {
    deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCard: (deck, card) => dispatch(createCard(deck, card))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: white,
    justifyContent: "center",
    padding: 15,
    margin: 10,
    borderRadius: 6,
    borderColor: primary_dark,
    borderWidth: 2
  },
  textInput: {
    borderRadius: 6,
    borderColor: primary_dark,
    borderWidth: 1,
    padding: 15,
    marginTop: 15
  },
  button: {
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    borderColor: primary_dark,
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: primary
  },
  disabled: {
    backgroundColor: primary_light
  }
});
