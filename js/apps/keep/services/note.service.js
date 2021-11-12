import { asyncStorageService } from '../../../../services/async-storage-service.js';
import { storageService } from '../../../../services/storage.service.js';
const NOTES_KEY = 'notes';
const notes = [
  {
    id: 'n101',
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: 'Fullstack Me Baby!',
      title: '',
    },
    style: {
      backgroundColor: '#808080',
    },
  },
  {
    id: 'n102',
    type: 'note-img',
    isPinned: false,
    info: {
      url: 'https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg?width=982&height=726&auto=webp&quality=75',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#808080',
    },
  },
  {
    id: 'n103',
    type: 'note-todos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: null },
        { txt: 'Coding power', doneAt: null },
      ],
    },
    style: {
      backgroundColor: '#808080',
    },
  },
  {
    id: 'n104',
    type: 'note-vid',
    isPinned: false,
    info: {
      url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      title: 'my first video',
    },
    style: {
      backgroundColor: '#808080',
    },
  },
];
var gNotes = notes;

export const noteService = {
  query,
  toPost,
  processUrl,
  toPut,
  toRemove,
  applyColor,
  filter,
  sortedPins,
  // processImg,
};

function query() {
  var notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  return Promise.resolve(notes);
}
function toPost(entityType, newEntity) {
  let res = asyncStorageService.post(entityType, newEntity);
  return Promise.resolve(res);
}
function toRemove(entityType, entityId) {
  let res = asyncStorageService.remove(entityType, entityId);
  return Promise.resolve(res);
}
function sortedPins(notes) {
  notes.sort((x, y) => {
    return x.isPinned === y.isPinned ? 0 : x.isPinned ? -1 : 1;
  });
}
function toPut(entityType, updatedEntity) {
  let res = asyncStorageService.put(entityType, updatedEntity);
  return Promise.resolve(res);
}
function processUrl(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return `//www.youtube.com/embed/${
    match && match[2].length === 11 ? match[2] : null
  }`;
}
function filter(type, title, notes) {
  if (!type && !title) return notes;
  const searchStr = title.toLowerCase();
  if (!title && type) {
    const notesToShow = notes.filter((note) => {
      return note.type.includes(type);
    });
    return notesToShow;
  } else if (!type && title) {
    const notesToShow = notes.filter((note) => {
      if (!note.info.title) return;
      return note.info.title.toLowerCase().includes(searchStr);
    });
    return notesToShow;
  } else {
    const notesToShow = notes.filter((note) => {
      if (!note.info.title) return;
      return (
        note.info.title.toLowerCase().includes(searchStr) &&
        note.type.includes(type)
      );
    });
    return notesToShow;
  }
}
function applyColor(entityType, entityId, color) {
  let res = asyncStorageService.get(entityType, entityId).then((note) => {
    note.style.backgroundColor = color;
    asyncStorageService.put(entityType, note);
  });
  return Promise.resolve(res);
}
// function processImg(e) {
//   const image = e.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   return e.target.result;
// }

_createNotes();
function _createNotes() {
  let notes = storageService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    storageService.saveToStorage(NOTES_KEY, gNotes);
  }
  return notes;
}
