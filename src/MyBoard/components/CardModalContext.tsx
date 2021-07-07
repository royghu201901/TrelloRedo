import { createContext } from 'react'

const CardModalContext = createContext({
  cardModalState: false,
  setCardModal: (cardModalState: boolean) => {},
  cardDesc: '',
  cardName: '',
  cardImg: '',
  listName: '',
  cardIndex: 0,
})

export default CardModalContext