
import {map} from 'redux-data-structures'

import {ADDED_MESSAGE} from 'types'

const initialState = {
  byId: {
    sagaOne: '',
    sagaTwo: '',
    sagaThree: '',
    sagaFour:''
  }
}

export const reducer = map({
  initialState,
  changeActionTypes: [ADDED_MESSAGE],
  keyGetter: action => action.payload.key,
  itemModifier: (item, action) => action.payload.value
})
