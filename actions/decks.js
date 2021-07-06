import { getRemoteDecks,  deleteRemoteDeck, addRemoteDeck } from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ'

function receiveDecks(decks) {
	return {
		type: GET_DECKS,
		decks
	}
}



function deleteDeck(deck) {
	return {
		type: DELETE_DECK,
		deck
	}
}

function addDeck(title) {
	return {
		type: ADD_DECK,
		title
	}
}

export function handleInitialData() {
	return (dispatch) => {
		return getRemoteDecks().then(decks => {
			//get data from async storage(act as our database )
			//then update our local redux store
			dispatch(receiveDecks(decks))
		})
	}
}

export function handleDeleteDeck(deck) {
	return (dispatch) => {
		return deleteRemoteDeck(deck).then(() => {
			dispatch(deleteDeck(deck))
		})
	}
}

export function handleAddDeck(title) {
	return (dispatch) => {
		return addRemoteDeck(title).then(() => {
			dispatch(addDeck(title))
		})
	}
}

