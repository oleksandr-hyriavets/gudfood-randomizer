const onSubmit = e => {
    e.preventDefault()

    const checkboxes = document.querySelectorAll('.checkbox')

    const selectedDishes = [...checkboxes].reduce(
        (acc, checkbox) => checkbox.checked ? [checkbox.value, ...acc] : acc,
        []
    )

    
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            action: 'randomize',
            payload: { dishes: selectedDishes }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.form').addEventListener('submit', onSubmit)
});