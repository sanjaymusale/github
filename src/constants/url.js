export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
export const SECRET_ID = process.env.REACT_APP_CLIENT_SECRET
export const LOGIN_AUTHORIZATION = `https://github.com/login/oauth/authorize?scope=user:email,repo,gist&client_id=${CLIENT_ID}`
export const LOGIN_WITH_CODE = `https://github.com/login/oauth/access_token`
export const BASE_URL = 'https://api.github.com'
export const GIST = `${BASE_URL}/gists`
export const USER_DETAILS = `${BASE_URL}/user`