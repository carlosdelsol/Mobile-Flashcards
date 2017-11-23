import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  secundary
} from "react-native";
import {
  white,
  red,
  green,
  primary,
  primary_light,
  primary_dark
} from "./../utils/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";
import { SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchData } from "./../actions";

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    incorrectAnswers: 0,
    correctAnswers: 0,
    showAnswer: false
  };

  displayAnswer = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showAnswer: !prevState.showAnswer
      };
    });
  };

  selectAnswer = type => {
    if (type === "correct") {
      this.incrementCorrectAnswers();
    } else if (type === "incorrect") {
      this.incrementIncorrectAnswers();
    }
  };

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      incorrectAnswers: 0,
      correctAnswers: 0,
      showAnswer: false
    });
  };

  incrementIncorrectAnswers = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        incorrectAnswers: prevState.incorrectAnswers + 1,
        currentQuestion: prevState.currentQuestion + 1
      };
    });
  };

  incrementCorrectAnswers = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestion: prevState.currentQuestion + 1
      };
    });
  };

  render() {
    const { deck, questions } = this.props;
    const { currentQuestion, showAnswer } = this.state;
    const question = questions[currentQuestion];

    if (!question) {
      let score = Math.round(
        this.state.correctAnswers / this.props.questions.length * 100,
        2
      );
      let finalMessage =
        score > 80
          ? `Congratulations! You are an expert in ${this.props.deck.title}`
          : `Continue to study ${this.props.deck.title}`;

      clearLocalNotification().then(setLocalNotification());

      return (
        <ScrollView>
          <View style={styles.results}>
            <Text>Your score is: {score} %</Text>
            <Text style={{ marginBottom: 20 }}>{finalMessage}</Text>
            <TouchableOpacity
              style={[styles.quizButton, { backgroundColor: primary }]}
              onPress={() => this.restartQuiz()}
            >
              <Text style={{ color: white }}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.quizContainer}>
          <ScrollView>
            <Text style={styles.progress}>
              {currentQuestion + 1}/{questions.length}
            </Text>
            <View>
              <View style={{ flex: 1 }}>
                {!showAnswer && (
                  <View style={styles.card}>
                    <Text style={styles.question}>{question.question}</Text>
                    <TouchableOpacity
                      style={styles.redLinkButton}
                      onPress={() => this.displayAnswer()}
                    >
                      <Text style={styles.buttonView}>
                        <SimpleLineIcons
                          name="eye"
                          size={15}
                          color={red}
                          iconStyle={{ padding: 20 }}
                        />
                        &nbsp; Show Answer
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {showAnswer && (
                  <View style={styles.card}>
                    <Text style={styles.question}>{question.answer}</Text>
                    <TouchableOpacity
                      style={styles.redLinkButton}
                      onPress={() => this.displayAnswer()}
                    >
                      <Text style={styles.buttonView}>Question</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.containerBottom}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.quizButton, styles.correctButton]}
                      onPress={() => this.selectAnswer("correct")}
                    >
                      <Text style={{ color: white }}>Correct</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.quizButton, styles.incorrectButton]}
                      onPress={() => this.selectAnswer("incorrect")}
                    >
                      <Text style={{ color: white }}>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

function mapStateToProps(decks, props) {
  const deck = decks[props.navigation.state.params.deckId];
  return {
    deck,
    questions: deck.questions.map((question, index) => {
      return {
        ...question,
        number: index
      };
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: data => dispatch(fetchData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10
  },
  buttonView: {
    color: red,
    fontWeight: "bold"
  },
  results: {
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 10,
    borderRadius: 6,
    borderColor: primary_dark,
    borderWidth: 2
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 10
  },
  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    borderColor: primary_dark,
    borderWidth: 2,
    backgroundColor: white
  },
  progress: {
    flex: 1,
    alignItems: "flex-start",
    alignSelf: "center",
    color: primary_light,
    fontWeight: "bold"
  },
  question: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 10
  },
  quizButton: {
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: primary,
    width: 150
  },
  redLinkButton: {
    alignSelf: "center"
  },
  correctButton: {
    backgroundColor: green
  },
  incorrectButton: {
    backgroundColor: red
  },
  cardFront: {
    flex: 1
  },
  cardBack: {
    flex: 1
  }
});
