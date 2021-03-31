const form = document.getElementById('mainForm');

console.log(form);

const inputs = [
  'baseURL',
  'mainProject'
]

form.addEventListener('submit', ( event ) => {
  event.preventDefault();
  getValues(event.currentTarget).forEach(item => {
    chrome.storage.sync.set({ [item.id]: item.value });
  })
})

const getValues = ( form ) => {
  const inputsMap = {};

  Array.prototype.forEach.call(form.elements, ( input ) => {
    if (input.name && !inputsMap[input.name] && input.value) {
      inputsMap[input.name] = {id: input.name, value: input.value};
    }
  });

  return Object.values(inputsMap);
};

// Add a button to the page for each supplied color
function constructOptions() {

  inputs.forEach(input => {
    chrome.storage.sync.get(input, (data) => {
      const element = document.getElementById(input);
      element.value = data[input] || '';
    });
  })
}
constructOptions();



// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");
//
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });
//
// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });
//
// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
