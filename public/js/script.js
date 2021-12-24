
const notes = document.getElementById('notes');

window.onload = () => {
    fetch('/', {
        method: 'post'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.text)
        notes.innerHTML += `<p>${data.text}</p>`;
    });
    
}