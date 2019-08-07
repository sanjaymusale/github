const initialState = {
  access_token: null
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      const { access_token } = action.payload
      return {
        ...state,
        access_token
      }
    default: return state
  }
}