function setToStorage(variableData) {
  localStorage.setItem(variableData.name, JSON.stringify(variableData.value));
}

function getFromStorage(variableName) {
  return JSON.parse(localStorage.getItem(variableName));
}

function removeFromStorage(variableName) {
  localStorage.removeItem(variableName);
}

export { setToStorage, getFromStorage, removeFromStorage };
