const notes = document.getElementById("notes");
const form = document.getElementById("form");
const edit = document.getElementById("edit");

edit.addEventListener('click', () => {
  confirmEdit();
});

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

    const noteControl = document.createElement("div");
    noteControl.classList.add("Index__noteControl");

    const noteDelete = document.createElement("p");
    noteDelete.classList.add("Index__noteDelete");

    const noteEdit = document.createElement("p");
    noteEdit.classList.add("Index__noteEdit");

    noteDelete.textContent = "✕";

    noteEdit.textContent = "✎";

    noteControl.appendChild(noteEdit);
    noteControl.appendChild(noteDelete);


    noteElement.appendChild(noteControl);

    notes.appendChild(noteElement);

    noteEdit.addEventListener('click', e => {
      startEdit(note.id, note.title, note.body);
    });

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

function startEdit(id, title, text) {
  form.submit.classList.add('hide');
   form.edit.classList.remove('hide');
   form.cancel.classList.remove('hide');

   form.dataset.id = id;
   form.title.focus();

   form.title.value = title;
   form.note.value = text;
}

function confirmEdit() {
  console.log(form.dataset.id, form.title.value, form.note.value);
  // WIP
}

function stopEdit() {
  form.submit.classList.remove('hide');
   form.edit.classList.add('hide');
   form.cancel.classList.add('hide');
   form.removeAttribute('data-id');
}

