export function clearToken() {
    localStorage.removeItem('id_token');
}
export function setToken(token) {
    localStorage.setItem('id_token', token);
}
export function clearTrace(){
    localStorage.removeItem('username')
}
export function setTrace(username){
    localStorage.setItem('username', username)
}
export function getToken() {
    try {
        const idToken = localStorage.getItem('id_token');
        return idToken
    } catch (err) {
        clearToken();
        return null;
    }
}

export function getTrace() {
    try {
        const username = localStorage.getItem('username');
        return username
    } catch (err) {
        clearTrace();
        return null;
    }
}