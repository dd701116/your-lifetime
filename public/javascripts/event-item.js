const eventList = []

function createMyEvent() {
    const eventColor = document.getElementById("eventColorInput")
    const eventName = document.getElementById("eventNameInput")
    if (eventColor.value && eventName.value && eventName.value.trim()!="") {
        const data = {
            range: range.clone(),
            color: eventColor.value,
            name: eventName.value,
        }
        eventList.push(data);
        range.apply(data.color);

        const logs = document.getElementById("logs");
        const li = document.createElement("li")
        li.textContent = data.name
        logs.appendChild(li)
    }
}
