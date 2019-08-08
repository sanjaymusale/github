export const auth_success = (data) => {
  return {
    type: 'AUTH_SUCCESS',
    payload: data
  }
}

export const logout_success = () => {
  return {
    type: 'LOGOUT_SUCCESS',
  }
}