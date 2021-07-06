import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { button } from "./Deck";
class Quiz extends Component {
  state = {
    currentQuestionIndex: 0,
    nOfCorrectAnswers: 0,
    showAnswer: false,
  };

  show = () => {
    this.setState((currentState) => ({
      showAnswer: !currentState.showAnswer,
    }));
  };

  modifyStateScore = async (result) => {
    result &&
      (await this.setState({
        nOfCorrectAnswers: this.state.nOfCorrectAnswers + result,
      }));

    this.showNextQuestion();
  };

  showNextQuestion = () => {
    const { route, navigation } = this.props;
    const { questions, title } = route.params;
    const QuestionsLength = questions.length;

    const { currentQuestionIndex, showAnswer, nOfCorrectAnswers } = this.state;

    if (currentQuestionIndex < QuestionsLength - 1) {
      this.setState(() => ({
        currentQuestionIndex: currentQuestionIndex + 1,
      }));
      //toggle the view to be the question if the answer is currently in view
      if (showAnswer) {
        this.show();
      }
    } else {
      //after user finished the quiz cancel the reminder notification today
      //that we set at the app component mounting
      //cause he did the job today
      //then set a new repeated notification every day at specific time
      clearLocalNotification().then(setLocalNotification);

      //go to the results page and give it the results to display it
      const Percentage = ((nOfCorrectAnswers / QuestionsLength) * 100).toFixed(
        0
      );

      navigation.navigate("Results", {
        deck: title,
        score: `${
          Percentage > 50 ? Percentage + " % Good Job" : Percentage + "%"
        }`,
      });

      this.setState({
        currentQuestionIndex: 0,
        showAnswer: false,
        nOfCorrectAnswers: 0,
      });
    }
  };

  render() {
    const { questions } = this.props.route.params;
    const QuestionsLength = questions.length;
    const { currentQuestionIndex, showAnswer } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return QuestionsLength > 0 ? (
      <View style={styles.view}>
        <View style={styles.questions}>
          {!showAnswer ? (
            <View>
              <Text style={[styles.text, { marginBottom: 20 }]}>
                {currentQuestion.question}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[styles.text, { marginBottom: 20 }]}>
                {currentQuestion.answer}
              </Text>
            </View>
          )}
          {/* show number of current question */}
          <Text style={styles.currentQuestion}>
            {currentQuestionIndex + 1} / {QuestionsLength}
          </Text>
        </View>

        {/* show the  buttons */}
        <View style={styles.AllButtons}>
          <TouchableHighlight
            onPress={() => this.modifyStateScore(1)}
            style={{ ...button, width:"50%" ,backgroundColor: "#006400" }}
          >
            <Text
              style={[
                styles.text,

                { fontSize: 20, color: "white" },
              ]}
            >
              {"Correct"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.modifyStateScore(0)}
            style={{ ...button,width:"50%", backgroundColor: "#FF4500" }}
          >
            <Text
              style={[
                styles.text,

                { fontSize: 20, color: "white" },
              ]}
            >
              {"Incorrect"}
            </Text>
          </TouchableHighlight>
        </View>

        {/* show answer or the question according to state  */}
        <View style={styles.showAnswer}>
          <TouchableHighlight onPress={this.show} style={{...button,backgroundColor:"black" }}>
            <Text style={{color:"white" , fontSize:20}}>
              {!showAnswer ? "Show Answer" : "Show Question"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    ) : (
      <View>
        <Text style={styles.empty}>
          Sorry, you cannot take the quiz because there are no cards in the
          deck.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 70,
  },
  questions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  currentQuestion: {
    textAlign: "center",
    fontSize: 17,
    marginBottom: 7,
    color: "red",
  },

  text: {
    fontSize: 20,
    textAlign: "center",
  },

  empty: {
    fontSize: 20,
    marginTop: "50%",
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },

  showAnswer: {
    flexDirection: "row",
    width :"100%",
    justifyContent:"center",
    
  },

  button: { ...button },
  AllButtons: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Quiz;
