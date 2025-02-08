const BASE_URL = 'https://buzzbox-1.onrender.com/api/v1';

//auth apis
export const authEndpoints = {
    signup:`${BASE_URL}/signup`,
    login:`${BASE_URL}/login`,
    userName:`${BASE_URL}/username`,
    oauth:`${BASE_URL}/oauth/signup`,
    setUserName:`${BASE_URL}/setusername`
}