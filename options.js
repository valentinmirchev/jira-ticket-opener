const form = document.getElementById('mainForm');

const addProjects = (projects) => {
  projects.forEach(project => {
    const id = project.trim();
    chrome.contextMenus.create({
      title: `${id}`,
      id,
      contexts:["selection"]
    });
  })
}

form.addEventListener('submit', ( event ) => {
  event.preventDefault();
  getValues(event.currentTarget).forEach(async (item) => {
    chrome.storage.sync.set({ [item.id]: item.value });
    if (item.id === 'projects') {
      await chrome.contextMenus.removeAll();
      const projects = item.value.split(',');
      addProjects(projects);
    }
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

function constructOptions() {
  chrome.storage.sync.get('baseURL', (data) => {
    const element = document.getElementById('baseURL');
    element.value = data['baseURL'] || '';
  });

  chrome.storage.sync.get('projects', (data) => {
    const element = document.getElementById('projects');
    element.value = data['projects'] || '';
  });
}
constructOptions();
