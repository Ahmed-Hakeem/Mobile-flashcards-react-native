import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { button } from "./Deck";
class Results extends Component {

  navigateToDeck = () => {
    const { navigation, route } = this.props;
    navigation.navigate("Deck", { name: route.params.deck });
  };

  navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { route } = this.props;
    const { score } = route.params;
    return (
      <View style={styles.view}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>You scored:</Text>
          <Text style={[styles.text]}>{score}</Text>
        </View>
        <View style={styles.Buttons}>
          <TouchableHighlight onPress={this.navigateBack} style={styles.button}>
            <Text style={styles.buttonText}>{"Restart Quiz"}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.navigateToDeck}
            style={{ ...styles.button, backgroundColor: "black" }}
          >
            <Text style={{ ...styles.buttonWord, color: "white" }}>
              {"Back To Deck"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
  Buttons: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  button: button,
  buttonWord: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Results;
