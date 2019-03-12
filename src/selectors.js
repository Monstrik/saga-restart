
// Literally maps to the type used by the action for navigation.
export const routeType = state => state.location.type

export const getSagaOneMessage = state => state.messages.byId.sagaOne
export const getSagaTwoMessage = state => state.messages.byId.sagaTwo
export const getSagaThreeMessage = state => state.messages.byId.sagaThree
export const getSagaFourMessage = state => state.messages.byId.sagaFour
