import { storageService } from '../../../../services/storage.service.js';

const NOTES_KEY = 'notes';
const notes = [
  {
    id: 'n101',
    type: 'note-txt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    id: 'n102',
    type: 'note-img',
    info: {
      url: 'http://some-img/me',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    id: 'n103',
    type: 'note-todos',
    info: {
      label: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
];
var gNotes = notes;

export const noteService = {
  query,
};

function query() {
  var notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  return Promise.resolve(notes);
}

_createNotes();
function _createNotes() {
  let notes = storageService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    storageService.saveToStorage(NOTES_KEY, gNotes);
  }
  return notes;
}
