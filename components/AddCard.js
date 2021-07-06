import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { handleAddCard } from "../actions/Cards";

class AddCard extends Component {
  state = {
    answer: "",
    question: "",
  };

  handleInputAnswer = (input) =>
    this.setState({
      answer: input,
    });

  handleInputQuestion = (input) =>
    this.setState({
      question: input,
    });

  submitQuestion = () => {
    let deck = this.props.route.params.deck;
    let card = this.state;

    console.log(card.question, card.answer);
    if (card.question !== "" && card.answer !== "") {
      //update async storage and the local storage with the new card
      this.props.dispatch(handleAddCard(deck, card));

      this.props.navigation.goBack();
    } else {
      return alert("please fill all fields");
    }
  };

  render() {
    let deck = this.props.route.params.deck;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={-1000}
        behavior="padding"
        style={styles.view}
      >
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 30 }}>Deck Name :{deck}</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Type your question "
            onChangeText={this.handleInputQuestion}
          />

          <TextInput
            style={styles.input}
            placeholder="Type your answer"
            onChangeText={this.handleInputAnswer}
          />

          <TouchableHighlight
            onPress={this.submitQuestion}
            style={styles.submit}
          >
            <Text style={styles.submitWord}>{"Submit"}</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    marginTop: 40,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderColor: "grey",
    marginBottom: 20,
    padding: 10,
    height: 50,
    width: "90%",
    borderRadius: 10,
    borderWidth: 0.5,
  },

  submit: {
    borderColor: "grey",
    backgroundColor: "green",
    borderRadius: 10,
    borderWidth: 0.5,
    height: 50,
    marginBottom: 30,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  submitWord: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
  },
});

const ConnecetedAddCard = connect()(AddCard);
export default ConnecetedAddCard;
