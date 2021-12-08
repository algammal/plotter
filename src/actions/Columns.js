import apiCalling from '../utilities/index'
import { RECEIVE_COLUMNS } from '../Types'
export function receivecolumns(columns) {
  return {
    type: RECEIVE_COLUMNS,
    columns,
  };
}
export function handleGetColumns() {
  return async (dispatch) => {
    let api = await apiCalling('https://plotter-task.herokuapp.com/columns');
    console.log(JSON.parse(api));
    dispatch(receivecolumns(JSON.parse(api)));
  };
}

