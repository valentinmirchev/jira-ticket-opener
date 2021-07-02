const addProjects = (projects) => {
  projects.forEach(project => {
    const id = project.trim();
    chrome.contextMenus.create({
      title: `Open for ${id}`,
      id,
      contexts:["selection"]
    });
  })
}

const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const openTicket = async ({ selectionText, menuItemId }) => {
  chrome.storage.sync.get(['baseURL'], async (result) => {
    const baseUrl = result.baseURL;

    if (!!baseUrl) {
      const url = `${baseUrl}${menuItemId}-${selectionText}`;
      const currentTab = await getCurrentTab();
      chrome.tabs.create({url, index: currentTab.index + 1});
    }
  });
};

chrome.storage.sync.get(['projects'], (result) => {
  const projects = result.projects.split(',')
  addProjects(projects);
});

chrome.contextMenus.onClicked.addListener(openTicket)
