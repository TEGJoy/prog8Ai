
const url = "http://localhost:2000";
var form = document.getElementById("customGameForm");
var seconds = 5;
var timer;
let resultBox = document.getElementById("customGameResult");
function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);
const altButton = document.getElementById("submit2");
altButton.addEventListener("click", sendToAnthro);
let wakeUpButton = document.getElementById("promptGet");
wakeUpButton.addEventListener('click', wakeUp);

async function wakeUp() {
    wakeUpButton.setAttribute('disabled', true);
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const result = await response.json();
        const newContent = document.createTextNode(result);
        const hr = document.createElement("hr");
        document.getElementById('prompt').removeAttribute('disabled', false);
        document.getElementById('submit').removeAttribute('disabled', false);
        document.getElementById('submit2').removeAttribute('disabled', false);
        resultBox.appendChild(newContent);
        resultBox.appendChild(hr);
    } catch (error) {
        console.error('Error:', error);
    }
}
async function sendToAI() {
    document.getElementById('submit').setAttribute('disabled', true);
    document.getElementById('prompt').setAttribute('disabled', true);
    document.getElementById('submit2').setAttribute('disabled', true);
    let input = document.getElementById('prompt').value;
    //"prompt": prompt,
    try {
        const response = await fetch(url + "/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "input": input
            }),
        });
        const result = await response.json();
        const newContent = document.createTextNode(result);
        resultBox.appendChild(newContent);
        const hr = document.createElement("hr");
        resultBox.appendChild(hr);
        console.log(input);
        console.log(result);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        document.getElementById('prompt').removeAttribute('disabled', false);
        document.getElementById('submit').removeAttribute('disabled', false);
        document.getElementById('submit2').removeAttribute('disabled', false);
    }
}
async function sendToAnthro() {
    let input = document.getElementById('prompt').value;
    document.getElementById('prompt').setAttribute('disabled', true);
    document.getElementById('submit').setAttribute('disabled', true);
    document.getElementById('submit2').setAttribute('disabled', true);
    //"prompt": prompt,
    try {
        const response = await fetch(url + "/anthro", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "input": input
            }),
        });
        const result = await response.json();
        const newContent = document.createTextNode(result);
        resultBox.appendChild(newContent);
        const hr = document.createElement("hr");
        resultBox.appendChild(hr);
        console.log(input);
        console.log(result);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        document.getElementById('prompt').removeAttribute('disabled', false);
        document.getElementById('submit').removeAttribute('disabled', false);
        document.getElementById('submit2').removeAttribute('disabled', false);
    }
}