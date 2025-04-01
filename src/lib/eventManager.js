const eventStore = {};

export function setupEventListeners(root) {
  if (!root) return;

  Object.keys(eventStore).forEach((eventType) => {
    root.addEventListener(eventType, handleEvent);
  });
}

function handleEvent(event) {
  const { type, target } = event;
  if (eventStore[type] && eventStore[type][target]) {
    eventStore[type][target]();
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventStore[eventType]) {
    eventStore[eventType] = {};
  }
  eventStore[eventType][element] = handler;
}

export function removeEvent(element, eventType, handler) {
  if (!eventStore[eventType]) {
    return;
  }

  if (eventStore[eventType][element] === handler) {
    delete eventStore[eventType][element];
  }
}
