import { storageService } from '../../../../services/storage.service.js';
// export const noteService = {
//   createNewNote,
// };
const NOTES_KEY = 'notes';
const notes = [
  {
    id: 'n101',
    type: 'note-txt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
    style: {
      backgroundColor: '#808080',
    },
  },
  {
    id: 'n102',
    type: 'note-img',
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
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
    style: {
      backgroundColor: '#808080',
    },
  },
  {
    id: 'n104',
    type: 'note-vid',
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

function createNewNote(id, type, info) {
  console.log(id, type, info);
}
