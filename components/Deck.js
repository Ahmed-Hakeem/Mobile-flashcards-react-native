import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { handleDeleteDeck } from "../actions/decks";

class Deck extends Component {
  deleteDeck = () => {
    const { dispatch, title, navigation } = this.props;
    dispatch(handleDeleteDeck(title)).then(() => {
      // console.log(navigation, this.props.route);
    });
    //go back first as it is better user experience ... then delete the data asyncronusly
    navigation.goBack();
  };

  navigateToAddCard = (deck) => {
    const { navigation } = this.props;
    navigation.navigate("AddCard", { deck });
  };

  navigateToQuiz = (questions, title) => {
    const { navigation } = this.props;
    navigation.navigate("Quiz", {
      questions,
      title,
    });
  };

  render() {
    const { title, questions, route } = this.props;
    const deckName = route.params.name;
    const nOfCards = questions.length;
    return (
      <View style={styles.deck}>
        <View style={styles.Info}>
          <Text style={styles.deckHeader}>{title}</Text>
          <Text style={styles.cardText}>
            {nOfCards === 1 ? nOfCards + " card" : nOfCards + " cards"}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.navigateToAddCard(deckName)}
            style={{ ...styles.btn, ...styles.addBtn }}
            activeOpacity={0.7}
          >
            <Text style={styles.btnWord}>{"Add card"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.navigateToQuiz(questions, deckName)}
            style={{ ...styles.btn, ...styles.quizBtn }}
            activeOpacity={0.7}
          >
            <Text style={{ ...styles.btnWord, color: "#fff" }}>
              {"start Quiz"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.deleteDeck} activeOpacity={0.7}>
            <Text style={[styles.btnText, styles.DeleteBtn]}>
              {"Delete Deck"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deckHeader: {
    color: "green",
    fontSize: 50,
  },
  cardText: {
    fontSize: 20,
  },
  Info: {
    alignItems: "center",
    marginBottom: 40,
  },

  btn: {
    height: 50,
    marginBottom: 16,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
  },

  DeleteBtn: {
    color: "#DAA520",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 10,
  },
  quizBtn: {
    backgroundColor: "black",
  },
  addBtn: {
    backgroundColor: "white",
  },

  btnWord: {
    fontSize: 20,
  },
});

function mapStateToProps({ decks }, { route }) {
  let deckName = route.params.name;

  // console.log(route, decks, deckName);
  return {
    title: decks[`${deckName}`] ? decks[`${deckName}`].title : "",
    questions: decks[deckName] ? decks[deckName].questions : "",
  };
}

const ConnectedDeck = connect(mapStateToProps)(Deck);

export default ConnectedDeck;

const button = styles.btn;
export { button };
