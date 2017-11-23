import React from "react";
import { createDeck } from "./../actions";
import { connect } from "react-redux";
import {
  primary,
  white,
  primary_light,
  red,
  primary_dark
} from "./../utils/colors";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

class CreateDeck extends React.Component {
  state = {
    input: null
  };

  handleAddDeck = () => {
    this.props.createDeck(this.state.input);
    this.props.navigation.navigate("Deck", { deckId: this.state.input });
    this.setState(() => ({
      input: null
    }));
  };

  handleTextChange = input => {
    this.setState(() => ({
      input
    }));
  };

  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={input}
          placeholder="Title"
          onChangeText={this.handleTextChange}
        />
        {!input && (
          <Text style={{ color: red, fontSize: 12, marginTop: 5 }}>
            Mandatory *
          </Text>
        )}
        <TouchableOpacity
          style={!input ? [styles.button, styles.disabled] : styles.button}
          onPress={this.handleAddDeck}
          disabled={!input}
        >
          <Text style={{ color: white }}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createDeck: data => dispatch(createDeck(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 10,
    borderRadius: 6,
    borderColor: primary_dark,
    borderWidth: 2
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 15
  },
  textInput: {
    borderRadius: 6,
    borderColor: primary_dark,
    borderWidth: 1,
    padding: 15,
    marginTop: 15,
    width: 300
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
