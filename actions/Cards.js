import {addRemoteCard }from "../utils/api"
export const ADD_CARD = 'ADD_CARD'

function setCard(deck, card) {
	return {
		type: ADD_CARD,
		card,
		deck
	}
}


export function handleAddCard(deck, card) {
	return (dispatch) => {
		return addRemoteCard(deck, card).then(() => {
			dispatch(setCard(deck, card))
		})
	}
}