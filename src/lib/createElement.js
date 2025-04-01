import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (typeof vNode.type === "function") {
    throw new Error("안돼 돌아가");
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    fragment.append(...vNode.map(createElement));
    return fragment;
  }

  const el = document.createElement(vNode.type);
  vNode.children.map(createElement).forEach((child) => el.appendChild(child));

  updateAttributes(el, vNode.props);
  return el;
}

function updateAttributes($el, props) {
  Object.entries(props || {}).map(([attribute, value]) => {
    if (attribute.startsWith("on")) {
      const eventType = attribute.replace(/^on/, "").toLowerCase();
      addEvent($el, eventType, value);
      return;
    }
    if (attribute === "className") {
      $el.setAttribute("class", value);
      return;
    } else {
      $el.setAttribute(attribute, value);
    }
  });
}
