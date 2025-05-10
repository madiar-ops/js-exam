// Массив заметок
let notes = [];

// Загрузка заметок из localStorage
function loadNotes() {
  const saved = localStorage.getItem("notes");
  if (saved) {
    notes = JSON.parse(saved);
  }
}

// Сохранение заметок в localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Отрисовка всех заметок
function renderNotes() {
  const notesList = document.getElementById("notes-list");
  const clearButton = document.getElementById("clear-all");

  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML =
      "<p class='empty-message'>Нет заметок. Добавь первую!</p>";
    clearButton.style.display = "none";
    return;
  }
  clearButton.style.display = "inline-block";

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  sortedNotes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card fade-in";

    // Поддержка градиента
    noteCard.style.background = note.color || "rgba(255, 255, 255, 0.08)";

    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="tags-container">
        ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="note-actions">
        <small class="note-date">Добавлено: ${note.createdAt}</small>
       <button class="pin-btn ${note.pinned ? 'pinned' : ''}" onclick="togglePin(${index})">
  ${note.pinned ? "📌 Открепить" : "📍 Закрепить"}
</button>


        <div class="color-picker">
  <div class="color-option" style="background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);" onclick="setColor(${index}, 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #232526, #414345);" onclick="setColor(${index}, 'linear-gradient(135deg, #232526, #414345)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #1d4350, #a43931);" onclick="setColor(${index}, 'linear-gradient(135deg, #1d4350, #a43931)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #2c3e50, #4ca1af);" onclick="setColor(${index}, 'linear-gradient(135deg, #2c3e50, #4ca1af)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #141e30, #243b55);" onclick="setColor(${index}, 'linear-gradient(135deg, #141e30, #243b55)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);" onclick="setColor(${index}, 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)')"></div>
  <div class="color-option" style="background: linear-gradient(135deg, #1e3c72, #2a5298);" onclick="setColor(${index}, 'linear-gradient(135deg, #1e3c72, #2a5298)')"></div>
</div>


        <button class="delete-btn" onclick="deleteNote(${index})">✖</button>
      </div>
    `;

    notesList.appendChild(noteCard);
  });
}

//  Закрепление
function togglePin(index) {
  notes[index].pinned = !notes[index].pinned;
  saveNotes();
  renderNotes();
}

// Добавление новой заметки
function addNote() {
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const tagsInput = document.getElementById("note-tags");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  if (title === "" || content === "") {
    alert("Заполни все поля!");
    return;
  }

  notes.push({
    title,
    content,
    pinned: false,
    color: "rgba(255, 255, 255, 0.08)",
    createdAt: new Date().toLocaleString(),
    tags,
  });

  saveNotes();
  renderNotes();

  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
}

//  Установка цвета (с поддержкой градиентов)
function setColor(index, color) {
  if (notes[index]) {
    notes[index].color = color;
    saveNotes();
    renderNotes();
  }
}

// Очистка всех заметок
function clearAllNotes() {
  if (confirm("Ты уверен, что хочешь удалить все заметки? 🚀")) {
    notes = [];
    saveNotes();
    renderNotes();
  }
}

//  Удаление одной заметки
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

//  Инициализация
document.getElementById("add-note").addEventListener("click", addNote);
document.getElementById("clear-all").addEventListener("click", clearAllNotes);

loadNotes();
renderNotes();
