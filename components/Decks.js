import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity ,ScrollView ,Image} from "react-native";
import { handleInitialData } from "../actions/decks";
import { connect } from "react-redux";

class Decks extends Component {
  componentDidMount() {
    //get all data stored in the async storage
    this.props.dispatch(handleInitialData());
  }

  navigateToDeck = (deck) => {
    this.props.navigation.navigate("Deck", { name: deck });
  };

  render() {
    const { decks } = this.props;
    const DecksHasProps = Object.getOwnPropertyNames(decks).length > 0;
    return (
      <ScrollView > 
        {DecksHasProps ? (
          Object.keys(decks).map((deck) => {
            const nOfQuestions = decks[deck].questions.length;
            return (
              <TouchableOpacity
                key={deck}
                style={styles.Deck}
                onPress={() => this.navigateToDeck(deck)}
              >
                <Text style={styles.DeckHeader}>{deck}</Text>

                {nOfQuestions !== 0 ? (
                  <Text style={styles.cardNumber}>
                    {nOfQuestions === 1
                      ? `${nOfQuestions} card `
                      : `${nOfQuestions} cards`}
                  </Text>
                ) : (
                  <Text style={{ color: "green" }}>
                    {"No cards added yet (0 Cards)"}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyData}>
            <Text style={styles.noDecksText}>
              No Decks available ,please add new Deck
            </Text>
            <Image style={{width:40,height:40 ,padding:30}} source={{uri:"https://p7.hiclipart.com/preview/965/977/107/smiley-happiness-feeling-emotion-smiley-png.jpg"}} ></Image>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  Deck: {
   
    width: "100%",
    borderWidth:.4,
    borderBottomColor:"grey",
    padding:10,
   backgroundColor:"rgb(240, 240, 240)",
    justifyContent: "center",
    alignItems: "center",
  },
  DeckHeader: {
    fontSize: 35,
    fontFamily:"monospace",
    padding: 5,
    color:"black",
    fontWeight:"700"
  },
  cardNumber: {
    fontSize: 15,

  },
  emptyData: {
   marginTop:"50%",
   marginLeft: 20,
   marginRight: 20,
  },
  noDecksText: {
    fontSize: 27,
    fontFamily:"monospace",
    textAlign: "center",
    color: "green",
  },
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

const ConnecetedDecks = connect(mapStateToProps)(Decks);

export default ConnecetedDecks;
