export default function apiCall(method, url) {
    // Regresa una promesa
    return fetch(url, {
        method
    }).then(response => response.json())
}