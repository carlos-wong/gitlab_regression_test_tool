export default function todoApp(state = {counter:1}, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
  case 'INCREMENT':
    state = {test:state.counter+1,counter:state.counter+1}
    // state.counter = state.counter + 1;
    break;
  default:
  }
  return state
}
