const astrosURL = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// the getJSON function will be entirely replaced by the fetch method
// function getJSON(url) {
//     return new Promise((resolve, reject) =>{
//         const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onload = () => {
//         if(xhr.status === 200){
//             let data = JSON.parse(xhr.responseText);
//             resolve(data);
//         }else{
//             reject(Error(xhr.statusText));
//         }
//     };
//     xhr.onerror = () => reject(Error('A network error occured'))
//     xhr.send();
//     });
// }

function getProfiles(json){

    const profiles = json.people.map( person => {
        if (person.name === "Anatoly Ivanishin") {
          person.name = "Anatoli Ivanishin";
        }
        if (person.name === "Chris Cassidy") {
          person.name = "Christopher Cassidy";
        }
        return fetch(wikiUrl + person.name)
                .then( response => response.json())
                .catch( err => console.log('Error Fetching Wiki', err))
      });
      return Promise.all(profiles);
}


function generateHTML (data){

    data.map(person => {
    
        const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
    `;
    });
    
}

btn.addEventListener("click", (event) => {
   event.target.textContent = "Loading...";

    fetch(astrosURL)
        .then( response => response.json())
        .then(getProfiles)
        .then(generateHTML)
        .catch( err => {
            peopleList.innerHTML = '<h3>Something went wrong</h3>'
            console.log(err)
        })
        .finally(() => event.target.remove() )
       
  });
