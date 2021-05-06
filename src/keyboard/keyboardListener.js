const createKeyboardListener = () => {
  document.addEventListener("keydown", (ev) => {
    let event = new CustomEvent("keyPressed", { detail: { key: ev.key } });
    document.dispatchEvent(event);
  });
};

export default createKeyboardListener;
