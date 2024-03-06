
const url = "http://localhost:2000";
var form = document.getElementById("customGameForm");
var seconds=5;
var timer;
let resultBox = document.getElementById("customGameResult");
function handleForm(event) { 
    event.preventDefault();
    if(!timer) 
    {
        timer = window.setInterval(function(){myFunction();}, 1000);
    } 
    } 
form.addEventListener('submit', handleForm);

function myFunction(){
        if (seconds >0 ) 
        { 
        seconds--;
        document.getElementById('submit').style.backgroundColor='red';
        document.getElementById('submit').setAttribute('disabled', true);
        } 
        else  {
        document.getElementById('submit').style.backgroundColor='green';
        document.getElementById('submit').removeAttribute('disabled', false);
    }
}
async function sendToAI(){
    let input = document.getElementById('prompt').value;
        //"prompt": prompt,
    try {
    const response = await fetch(url, {
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
    console.log(input);
    console.log(result);
    }
    catch (error) {
        console.error('Error:', error);
      }
    }