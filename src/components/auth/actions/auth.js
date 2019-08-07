export const auth_success = (data) => {
  return {
    type: 'AUTH_SUCCESS',
    payload: data
  }
}