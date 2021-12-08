export default function apiCalling(api) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => console.log('error', error));
}