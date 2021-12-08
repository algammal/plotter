import { RECEIVE_COLUMNS } from '../Types'
let initialState = []
const reducer = (state = initialState, action) => {
    if (action.type === RECEIVE_COLUMNS) {
        return {
            ...state,
            ...action.columns
        }
    }
    return state;
}
export default reducer;