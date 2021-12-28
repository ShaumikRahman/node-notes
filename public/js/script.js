const notes = document.getElementById("notes");
const form = document.getElementById("form");

window.onload = () => {
  fetch("/", {
    method: "post",
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((note) => {
        notes.innerHTML += `<p>Note ${note.id}, ${
          note.title
        }, created at ${new Date(note.created * 1000)}, ${note.body}</p>`;
      });
    });
};

form.onsubmit = (e) => {
  e.preventDefault();

  const note = e.target.note.value.trim().replace(/\s\s+/g, " ");

  console.log(note);

  fetch("/add", {
    method: "POST",
    body: JSON.stringify({ note }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
