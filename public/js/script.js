
const notes = document.getElementById('notes');

window.onload = () => {
    fetch('/', {
        method: 'post'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        //notes.innerHTML += `<p>${data.text}</p>`;
        data.forEach(note => {
            notes.innerHTML += `<p>Note ${note.id}, ${note.title}, created at ${new Date(note.created * 1000)}, ${note.body}</p>`;
        });
    });
    
}