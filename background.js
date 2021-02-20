openTicket = async ( { selectionText }) => {
  let baseUrl = '';
  let mainProject = '';
  chrome.storage.sync.get("baseURL", (value) => {
    console.log(value);
    baseUrl = Object.values(value)[0];

    chrome.storage.sync.get("mainProject", (value) => {
      console.log(value);
      mainProject = Object.values(value)[0];

      if (!!mainProject && !!baseUrl) {
        const url = `${baseUrl}${mainProject}-${selectionText}`;
        console.log(url);
        chrome.tabs.create({url});
      }
    });
  });
};

chrome.contextMenus.onClicked.addListener(openTicket)
chrome.contextMenus.create({
  title: "Open JIRA Ticket",
  id: "default",
  contexts:["selection"]
});
