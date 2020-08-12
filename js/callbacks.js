const astrosURL = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');


//Make AJAX request

function getJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if(xhr.status === 200){
            let data = JSON.parse(xhr.responseText);
            return callback(data);
        }
    };
    xhr.send();
}

function getProfiles(){

    json.people.map((person) => {
        if (person.name === "Anatoly Ivanishin") {
          person.name = "Anatoli Ivanishin";
        }
        if (person.name === "Chris Cassidy") {
          person.name = "Christopher Cassidy";
        }
        getJSON(wikiUrl + person.name, generateHTML);
      });
}

//Generate the markup for each profile

function generateHTML (data){
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
        <img src=${data.thumbnail.source}>
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>${data.extract}</p>
    `;
}

btn.addEventListener("click", () => {
    getJSON(astrosURL, (getProfiles/*json*/) => {
            //copied to getProfiles function to make the code easier to read

    //   json.people.map((person) => {
    //     if (person.name === "Anatoly Ivanishin") {
    //       person.name = "Anatoli Ivanishin";
    //     }
    //     if (person.name === "Chris Cassidy") {
    //       person.name = "Christopher Cassidy";
    //     }
    //     getJSON(wikiUrl + person.name, generateHTML);
    //   });
    });
    event.target.remove();
  });
