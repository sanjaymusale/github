const initialState = {
  access_token: null,
  user: {},
  isProcessing: false,
  isUserAuthenticated: false,
  authError: false
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      const { access_token, user } = action.payload
      return {
        ...state,
        access_token,
        user,
        isProcessing: false,
        isUserAuthenticated: true,
        authError: false
      }
    case 'AUTH_PENDING':
      return {
        ...state,
        isProcessing: true
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        authError: true,
        isProcessing: false
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        access_token: null,
        user: {},
        isUserAuthenticated: false
      }
    default: return state
  }
}