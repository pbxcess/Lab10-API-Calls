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
    fetch('https://jsonplaceholder.typicode.com/posts/1')
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
xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
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

//Task 3
postForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        displayMessage(`Post created! ID: ${data.id}`);
    })
    .catch(err => displayMessage(`POST error: ${err.message}`, true));
});

//Task 4
putForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('postId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>Updated Post ${data.id}</h3><p>${data.title}</p><p>${data.body}</p>`
        } else {
            displayMessage(`PUT error: ${xhr.status}`, true);
        }
    };
    xhr.onerror = function() {
        displayMessage('Network error (PUT)', true);
    };
    xhr.send(JSON.stringify({ id, title, body, userId: 1}));
});

//Adding Delete
const deleteForm = document.getElementById('deleteForm');

deleteForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    if (!confirm(`Are you sure you want to delete post ID ${id}?`)) {
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                displayMessage(`Post with ID ${id} deleted successfully (simulated).`);
            } else {
                throw new Error(`Failed to delete post. Status: ${res.status}`);
            }
        })
        .catch(err => displayMessage(`DELETE error: ${err.message}`, true));
});
