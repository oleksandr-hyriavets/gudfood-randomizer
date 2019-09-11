function selectItem(kind) {
  const buyBtns = document.querySelectorAll(`#${kind} .buy`);

  const randomBuyBtnIdx = Math.round((Math.random() * 100000) % buyBtns.length);
  const randomBuyBtn = buyBtns[randomBuyBtnIdx];

  randomBuyBtn.click();
}

function goToTab(hash) {
  const tabs = document.querySelectorAll("ul.nav-tabs li a");

  const tabWithProperHash = [...tabs].find(tab => tab.hash === hash);

  if (tabWithProperHash) {
      tabWithProperHash.click();
  }
}

function makeAnOrder(kinds) {
  kinds.forEach(kind => {
      goToTab(`#${kind}`);
      selectItem(kind);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "randomize") {
    makeAnOrder(request.payload.dishes);
  }
});