// Массив заметок
let notes = [];

// Загрузка заметок из localStorage
function loadNotes() {
  const saved = localStorage.getItem('notes');
  if (saved) {
    notes = JSON.parse(saved);
  }
}

// Сохранение заметок в localStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Отрисовка всех заметок
function renderNotes() {
  const notesList = document.getElementById('notes-list');
  const clearButton = document.getElementById('clear-all');
  notesList.innerHTML = '';

  if (notes.length === 0) {
    notesList.innerHTML = "<p class='empty-message'>Нет заметок. Добавь первую!</p>";
    clearButton.style.display = 'none';
    return;
  }
  clearButton.style.display = 'inline-block';

  // 1. Сортируем закреплённые заметки вверх
  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  sortedNotes.forEach((note, index) => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card fade-in';
    noteCard.style.backgroundColor = note.color || '#1f2028';

    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
       <div class="tags-container">
    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
  </div>
       <div class="note-actions">
       <small class="note-date">Добавлено: ${note.createdAt}</small>
    <button class="pin-btn" onclick="togglePin(${index})">${note.pinned ? '📌 Открепить' : '📍 Закрепить'}</button>
    <div class="color-picker">
      <div class="color-option" style="background:#ff6b6b;" onclick="setColor(${index}, '#ff6b6b')"></div>
      <div class="color-option" style="background:#2ecc71;" onclick="setColor(${index}, '#2ecc71')"></div>
      <div class="color-option" style="background:#3498db;" onclick="setColor(${index}, '#3498db')"></div>
      <div class="color-option" style="background:#f1c40f;" onclick="setColor(${index}, '#f1c40f')"></div>
      <div class="color-option" style="background:#9b59b6;" onclick="setColor(${index}, '#9b59b6')"></div>
    </div>
    <button class="delete-btn" onclick="deleteNote(${index})">✖</button>
  </div>
`;

    notesList.appendChild(noteCard);
  });
}
function togglePin(index) {
  notes[index].pinned = !notes[index].pinned;
  saveNotes();
  renderNotes();
}


// Добавление новой заметки
function addNote() {
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');
  const tagsInput = document.getElementById('note-tags');

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');




  if (title === '' || content === '') {
    alert('Заполни все поля!');
    return;
  }

  notes.push({ 
    title, 
    content, 
    pinned: false, 
    color: "#1f2028",
    createdAt: new Date().toLocaleString(),
    tags
  });
  
  saveNotes();
  renderNotes();

  titleInput.value = '';
  contentInput.value = '';
  tagsInput.value = '';
}

//Кнопка Очистить все
document.getElementById('clear-all').addEventListener('click', clearAllNotes);

function clearAllNotes() {
  if (confirm('Ты уверен, что хочешь удалить все заметки? 🚀')) {
    notes = [];
    saveNotes();
    renderNotes();
  }
}
function setColor(index, color) {
  notes[index].color = color;
  saveNotes();
  renderNotes();
}



// Удаление заметки
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

// Инициализация
document.getElementById('add-note').addEventListener('click', addNote);

// При загрузке страницы
loadNotes();
renderNotes();
