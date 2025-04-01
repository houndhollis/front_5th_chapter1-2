import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  for (const [attr, value] of Object.entries(originNewProps)) {
    if (originOldProps[attr] !== originNewProps[attr]) {
      if (attr.startsWith("on")) {
        const eventType = attr.replace(/^on/, "").toLowerCase();
        addEvent(target, eventType, value);
      }
      if (attr === "className") {
        target.setAttribute("class", value);
        return;
      }
      target.setAttribute(attr, value);
    }
  }

  for (const attr of Object.keys(originOldProps)) {
    if (!originNewProps[attr]) {
      if (attr.startsWith("on")) {
        const eventType = attr.replace(/^on/, "").toLowerCase();
        removeEvent(target, eventType, originOldProps[attr]);
      }
    }
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) {
    return parentElement.removeChild(parentElement.children[index]);
  }

  if (!oldNode && newNode) {
    return parentElement.appendChild(createElement(newNode));
  }

  if (newNode.type !== oldNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }

  if (typeof newNode === "string" || typeof oldNode === "string") {
    if (newNode !== oldNode) {
      parentElement.replaceChild(
        document.createTextNode(newNode),
        parentElement.childNodes[index],
      );
    }
    return;
  }

  updateAttributes(
    parentElement.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  );

  const childrenLengthMax = Math.max(
    newNode.children.length,
    oldNode.children.length,
  );

  for (let i = 0; i < childrenLengthMax; i++) {
    updateElement(
      parentElement.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}
