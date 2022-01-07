const notes = document.getElementById("notes");
const form = document.getElementById("form");

window.onload = () => {
  getNotes();
};

function getNotes() {
  notes.textContent = "";
  fetch("/", {
    method: "post",
  })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
    });
}

function setNotes(newNotes) {

  notes.textContent = "";


  newNotes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("Index__note");

    const noteInfo = document.createElement("div");
    noteInfo.classList.add("Index__noteInfo");

    const noteHeader = document.createElement("h2");
    noteHeader.classList.add("Index__title");
    const noteBody = document.createElement("p");
    noteBody.classList.add("Index__body");

    noteHeader.textContent = `${note.title}`;
    noteBody.textContent = `${note.body}`;

    noteInfo.appendChild(noteHeader);
    noteInfo.appendChild(noteBody);

    noteElement.appendChild(noteInfo);

    const noteDeleteContainer = document.createElement("div");
    noteDeleteContainer.classList.add("Index__noteDeleteContainer");

    const noteDelete = document.createElement("p");
    noteDelete.classList.add("Index__noteDelete");

    noteDelete.textContent = "✕";

    noteDeleteContainer.appendChild(noteDelete);
    noteElement.appendChild(noteDeleteContainer);

    notes.appendChild(noteElement);

    noteDelete.addEventListener('click', e => {
      deleteNote(note.id);
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

function deleteNote(id) {
  fetch("/delete", {
    method: 'post',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => setNotes(data.newNotes));
}