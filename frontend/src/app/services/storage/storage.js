function setToStorage(variableData) {
  localStorage.setItem(variableData.name, JSON.stringify(variableData.value));
}

function getFromStorage(variableName) {
  return JSON.parse(localStorage.getItem(variableName));
}

export { setToStorage, getFromStorage };
