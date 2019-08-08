const initialState = {
  access_token: null,
  user: {}
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      const { access_token, user } = action.payload
      return {
        ...state,
        access_token,
        user
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        access_token: null,
        user: {}
      }
    default: return state
  }
}