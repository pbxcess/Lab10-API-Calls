const output = document.getElementById('output');
const fetchBtn = document.getElementById('fetchBtn');
const xhrBtn = document.getElementById('xhrBtn');
const postForm = document.getElementById('postForm');
const putForm = document.getElementById('putForm');

//to Display messages
function displayMessage(message, isError = false) {
    output.innerHTML = `<p style="color:${isError ? 'red' : 'green'}">${message}</p>`;
}

//Task 1
fetchBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typiode.come/posts/1')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        })
        .catch(err => displayMessage(`Fetch error: ${err.message}`, true));
});

//Task 2
xhrBtn.addEventListener('click', => {
    const.xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        } else {
            displayMessage(`XHR error: ${xhr.status}`, true);
        }
    };
    xhr.onerror = function() {
        displayMessage('Network error (XHR)', true);
    };
    xhr.send();
});