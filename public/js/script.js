const notes = document.getElementById("notes");
const form = document.getElementById("form");

window.onload = () => {
  getNotes();
};

function getNotes() {
  notes.innerHTML = "";
  fetch("/", {
    method: "post",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((note, index) => {

        let noteElement = document.createElement("div");
        noteElement.classList.add('Index__note');

        let noteHeader = document.createElement('h2');
        noteHeader.classList.add('Index__title');

        let noteBody = document.createElement('p');
        noteBody.classList.add('Index__body');

        noteHeader.textContent = `${note.title}`;
        noteBody.textContent = `${note.body}`;

        // temp.textContent = `Note ${index + 1}, ID ${note.id}, ${
        //   note.title
        // }, created at ${new Date(note.created * 1000)}, ${note.body}`;

        noteElement.appendChild(noteHeader);
        noteElement.appendChild(noteBody);
        notes.appendChild(noteElement);

        // notes.innerHTML += `<p>Note ${index+1}, ID ${note.id}, ${
        //   note.title
        // }, created at ${new Date(note.created * 1000)}, ${note.body}</p>`;
      });
    });
}

form.onsubmit = (e) => {
  e.preventDefault();


  const title = cleanString(e.target.title.value);
  const note = cleanString(e.target.note.value);

  form.reset();

  console.log(note);

  fetch("/add", {
    method: "POST",
    body: JSON.stringify({ title, note }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => getNotes());
};

function cleanString(str) {
  return str.trim().replace(/\s\s+/g, " ");
}
