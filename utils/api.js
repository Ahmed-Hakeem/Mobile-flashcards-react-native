import AsyncStorage from "@react-native-async-storage/async-storage";

export const DECKS_STORAGE_KEY = "@MobileFlashCards:Decks";

(async () => {
  const keys = await AsyncStorage.getAllKeys();

  const result = await AsyncStorage.multiGet(keys);
  console.log(JSON.parse(result[0][1]));
})();

//Decks

//get all data saved in the storage
export async function getRemoteDecks() {
  const Data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const Decks = JSON.parse(Data);
  return Decks;
}

export async function addRemoteDeck(title) {
  const Deck = {
    title: title,
    questions: [],
  };

  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: Deck,
    })
  );
}

export async function deleteRemoteDeck(deck) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  let Decks = JSON.parse(results);
  Decks[deck] = undefined;
  delete Decks[deck];
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(Decks));
}

//Cards
export async function addRemoteCard(deck, card) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  let decks = JSON.parse(results);

  decks[deck].questions.push(card);
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}
