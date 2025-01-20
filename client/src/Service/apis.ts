const BASE_URL = 'http://localhost:5000/api/v1';

//auth apis
export const authEndpoints = {
    signup:`${BASE_URL}/signup`,
    login:`${BASE_URL}/login`,
    userName:`${BASE_URL}/username`,
    oauth:`${BASE_URL}/oauth/signup`,
    setUserName:`${BASE_URL}/setusername`
}