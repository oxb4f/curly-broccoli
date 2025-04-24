import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';
import { getUserFromStorage } from '../storage/user';

const getTrackers = async (bookId, params = {}) => {
  if (!bookId) return;

  const response = await api.get(`books/${bookId}/readingTrackers`, {
    params: {
      orderDirection: 'desc',
      orderField: 'createdAt',
      ...params
    }
  });
  console.log(response);

  return processResponse(response, 'reading-trackers');
};

const startTracker = async (bookId) => {
  const response = await api.post(`books/${bookId}/readingTrackers/start`);
  console.log(response);

  return processResponse(response, 'reading-trackers');
};

const pauseTracker = async (id, bookId) => {
  const response = await api.post(`books/${bookId}/readingTrackers/${id}/pause`);
  console.log(response);

  return processResponse(response, 'reading-trackers');
};

const resumeTracker = async (id, bookId) => {
  const response = await api.post(`books/${bookId}/readingTrackers/${id}/resume`);
  console.log(response);

  return processResponse(response, 'reading-trackers');
};

const finishTracker = async (id, bookId) => {
  const response = await api.post(`books/${bookId}/readingTrackers/${id}/finish`);
  console.log(response);

  return processResponse(response, 'reading-trackers');
};

const pauseTrackerInBackground = async (id, bookId) => {
  const user = getUserFromStorage();
  const response = await fetch(`http://localhost/api/books/${bookId}/readingTrackers/${id}/pause`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.jwt.access}`
    },
    credentials: 'include',
    keepalive: true
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json);
    return processResponse(json, 'reading-trackers');
  }
};

const syncPauseTracker = (id, bookId) => {
  const user = getUserFromStorage();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost/api/books/${bookId}/readingTrackers/${id}/pause`, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${user.jwt.access}`);
  xhr.withCredentials = true;

  xhr.send();
};

export {
  getTrackers,
  startTracker,
  pauseTracker,
  resumeTracker,
  finishTracker,
  syncPauseTracker,
  pauseTrackerInBackground
};
