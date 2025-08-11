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
})