import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";

import { handleAddDeck } from "../actions/decks";

class AddDeck extends Component {
  state = {
    deckName: "",
  };

  handleInput = (text) => {
    this.setState({
      deckName: text,
    });
  };

  submit = () => {
    let deckName = this.state.deckName;
    const { dispatch, navigation } = this.props;

    if (deckName !== "") {
      dispatch(handleAddDeck(deckName)).then(() => {
        this.setState({ deckName: "" });
        navigation.navigate("Deck", { name: deckName });
      });
    } else {
      return alert("please write the name of your new deck");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.view}>
        <View style={styles.inputs}>
          <Text style={styles.header}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={this.handleInput}
            value={this.state.deckName}
            maxLength={15}
            placeholderTextColor={"#A9A9A9"}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableHighlight onPress={this.submit} style={styles.submit}>
            <Text style={styles.text}>{"Create Deck"}</Text>
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
  
  },
  inputs: {
    width: "100%",
    marginTop: 55,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    padding: 5,
    fontSize: 30,
  },
  input: {
    padding: 10,
    height: 50,
    width: "85%",
    marginBottom: 20,
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5,
  },
  submitContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: .5,
    height: 50,
    paddingTop: 5,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "green",
  },
  text: {
    textAlign: "center",
    fontSize: 23,
    fontWeight:"100",
    color: "white",
  },
});

const ConnecetedAddDeck = connect()(AddDeck);
export default ConnecetedAddDeck;
