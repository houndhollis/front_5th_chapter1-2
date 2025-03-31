const eventHandlers = {};

export function setupEventListeners(root) {
  if (!root) return;

  Object.keys(eventHandlers).forEach((eventType) => {
    root.addEventListener(eventType, handleEvent);
  });
}

function handleEvent(event) {
  const { type, target } = event;
  if (eventHandlers[type] && eventHandlers[type][target]) {
    eventHandlers[type][target]();
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }
  eventHandlers[eventType][element] = handler;
}

export function removeEvent(element, eventType, handler) {
  if (!eventHandlers[eventType]) {
    return;
  }

  if (eventHandlers[eventType][element] === handler) {
    delete eventHandlers[eventType][element];
  }
}
