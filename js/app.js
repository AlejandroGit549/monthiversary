const storageKey = 'monthiversary-v1';
const publishedContent = {
  names: 'Jess y Ale',
  startDate: '2026-07-27',
  notes: [
    { date: '2026-07-27', title: 'El comienzo', note: 'Un día para marcar en el calendario y volver a celebrar cada mes.' },
    { date: '2026-08-27', title: 'Nuestro primer mes', note: 'Un mes de muchos por venir. Lo mejor de esta historia es seguir escribiéndola juntos.' },
    { date: '2026-09-27', title: 'Dos meses a tu lado', note: '60 días descubriendo que las cosas más simples son inolvidables si las comparto contigo. ¡Felices dos meses!' }
  ],
  poems: [
    {
      title: 'Desde aquel 27',
      text: 'Desde aquel 27 de julio,\nel tiempo aprendió otro idioma:\nuno que se dice en miradas\ny se escribe con nuestros días.',
      signature: 'Para Jess y Ale'
    },
    {
      title: 'Dos meses de luz',
      text: 'Dos meses han pasado ya,\ny en cada instante compartido,\nconfirmas que el mejor lugar\nes coincidir en el camino.',
      signature: 'Con todo mi amor'
    }
  ],
  collage: [
    { src: 'https://i.ibb.co/60XL87TD/IMG-3703.jpg', alt: 'Enamorados', note: 'Una noche especial juntos.' },
    { src: 'https://i.ibb.co/6JN6J6zd/IMG-3753.jpg', alt: 'Celebración juntos', note: 'Celebrando juntos.' },
    { src: 'https://i.ibb.co/9mFbmPB0/80227126-3ed4-4049-88e9-68d0ba04ea6a.jpg', alt: 'Detalle', note: 'Nuestro segundo mes juntos: una foto especial de este día.' }
  ]
};
const defaultState = { names: publishedContent.names, startDate: publishedContent.startDate, memories: [] };

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && typeof saved === 'object'
      ? { ...defaultState, ...saved, names: saved.names || publishedContent.names, startDate: saved.startDate || publishedContent.startDate, memories: Array.isArray(saved.memories) ? saved.memories : [] }
      : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function anniversaryFor(start, months) {
  const year = start.getFullYear();
  const month = start.getMonth() + months;
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(start.getDate(), lastDay));
}

function getMilestone(dateString, now = new Date()) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  const start = new Date(year, month - 1, day);
  if (!year || !month || !day || Number.isNaN(start.getTime()) || start.getMonth() !== month - 1 || start.getDate() !== day) return null;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (start > today) return null;

  let completed = (today.getFullYear() - year) * 12 + today.getMonth() - (month - 1);
  if (anniversaryFor(start, completed) > today) completed -= 1;
  const next = anniversaryFor(start, completed + 1);
  const daysLeft = Math.round((Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
  return { completed, next, daysLeft };
}

if (typeof document !== 'undefined') {
  const state = loadState();
  const settingsDialog = document.querySelector('#settings-dialog');
  const memoryDialog = document.querySelector('#memory-dialog');
  const namesInput = document.querySelector('#names-input');
  const startInput = document.querySelector('#start-input');
  const memoryDateInput = document.querySelector('#memory-date');
  const todayString = new Date().toLocaleDateString('en-CA');
  let noteIndex = 0;
  let photoIndex = 0;

  startInput.max = todayString;
  memoryDateInput.max = todayString;

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function render() {
    const milestone = getMilestone(state.startDate);
    document.querySelector('#couple-name').textContent = state.names.trim() || 'Tú + yo';
    document.querySelector('#months-count').textContent = milestone ? String(milestone.completed).padStart(2, '0') : '00';
    document.querySelector('#days-count').textContent = milestone ? String(milestone.daysLeft).padStart(2, '0') : '--';
    document.querySelector('#next-date').textContent = milestone
      ? new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long' }).format(milestone.next)
      : 'Elige su fecha de inicio';
    document.querySelector('#start-label').textContent = milestone
      ? `Desde el ${new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${state.startDate}T12:00:00`))}`
      : 'Cada historia empieza en algún lugar.';

    const list = document.querySelector('#memory-list');
    list.replaceChildren();
    const notes = [...publishedContent.notes, ...state.memories];
    noteIndex = Math.min(noteIndex, Math.max(notes.length - 1, 0));
    document.querySelector('#empty-memories').hidden = notes.length > 0;
    document.querySelector('#notes-controls').hidden = notes.length < 2;
    document.querySelector('#notes-count').textContent = `${noteIndex + 1} / ${notes.length}`;
    const memory = notes[noteIndex];
    if (memory) {
      const card = document.createElement('article');
      card.className = 'memory-card';
      const date = document.createElement('time');
      date.dateTime = memory.date;
      date.textContent = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${memory.date}T12:00:00`));
      const title = document.createElement('h3');
      title.textContent = memory.title;
      const note = document.createElement('p');
      note.textContent = memory.note;
      card.append(date, title, note);
      if (memory.id) {
        const remove = document.createElement('button');
        remove.className = 'icon-button remove-memory';
        remove.type = 'button';
        remove.title = 'Eliminar recuerdo';
        remove.setAttribute('aria-label', `Eliminar ${memory.title}`);
        remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>';
        remove.addEventListener('click', () => {
          state.memories = state.memories.filter(item => item.id !== memory.id);
          save();
          render();
        });
        card.append(remove);
      }
      list.append(card);
    }

    const poemList = document.querySelector('#poem-list');
    poemList.replaceChildren();
    document.querySelector('#empty-poems').hidden = publishedContent.poems.length > 0;
    for (const poem of publishedContent.poems) {
      const card = document.createElement('article');
      card.className = 'poem-card';
      const title = document.createElement('h3');
      title.textContent = poem.title;
      const text = document.createElement('p');
      text.textContent = poem.text;
      const signature = document.createElement('span');
      signature.className = 'poem-signature';
      signature.textContent = poem.signature || '';
      card.append(title, text, signature);
      poemList.append(card);
    }

    const collageList = document.querySelector('#collage-list');
    collageList.replaceChildren();
    const photos = publishedContent.collage;
    photoIndex = Math.min(photoIndex, Math.max(photos.length - 1, 0));
    document.querySelector('#empty-collage').hidden = photos.length > 0;
    document.querySelector('#photos-controls').hidden = photos.length < 2;
    document.querySelector('#photos-count').textContent = `${photoIndex + 1} / ${photos.length}`;
    const photo = photos[photoIndex];
    if (photo) {
      const figure = document.createElement('figure');
      figure.className = 'collage-photo';
      const image = document.createElement('img');
      image.src = photo.src;
      image.alt = photo.alt || photo.note || 'Recuerdo de Jess y Ale';
      image.loading = 'lazy';
      const caption = document.createElement('figcaption');
      caption.textContent = photo.note;
      figure.append(image, caption);
      collageList.append(figure);
    }
    window.lucide?.createIcons();
  }

  function openSettings() {
    namesInput.value = state.names;
    startInput.value = state.startDate;
    settingsDialog.showModal();
  }
  function openMemory() {
    memoryDateInput.value = todayString;
    memoryDialog.showModal();
  }
  document.querySelector('#open-settings').addEventListener('click', openSettings);
  document.querySelector('#open-settings-intro').addEventListener('click', openSettings);
  document.querySelector('#open-memory').addEventListener('click', openMemory);
  document.querySelector('#open-memory-empty').addEventListener('click', openMemory);
  document.querySelector('#notes-prev').addEventListener('click', () => {
    noteIndex = (noteIndex - 1 + publishedContent.notes.length + state.memories.length) % (publishedContent.notes.length + state.memories.length);
    render();
  });
  document.querySelector('#notes-next').addEventListener('click', () => {
    noteIndex = (noteIndex + 1) % (publishedContent.notes.length + state.memories.length);
    render();
  });
  document.querySelector('#photos-prev').addEventListener('click', () => {
    photoIndex = (photoIndex - 1 + publishedContent.collage.length) % publishedContent.collage.length;
    render();
  });
  document.querySelector('#photos-next').addEventListener('click', () => {
    photoIndex = (photoIndex + 1) % publishedContent.collage.length;
    render();
  });
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));

  document.querySelector('#settings-form').addEventListener('submit', event => {
    event.preventDefault();
    state.names = namesInput.value.trim();
    state.startDate = startInput.value;
    save();
    render();
    settingsDialog.close();
  });

  document.querySelector('#memory-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    state.memories.push({
      id: crypto.randomUUID(),
      date: fields.get('date'),
      title: fields.get('title').trim(),
      note: fields.get('note').trim()
    });
    noteIndex = publishedContent.notes.length + state.memories.length - 1;
    save();
    render();
    form.reset();
    memoryDialog.close();
  });

  render();
}