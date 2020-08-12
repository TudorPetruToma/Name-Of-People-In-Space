const astrosURL = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');


//Handle all fech requests

async function getJSON(url) {
    try{
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getPeopleInSpace(url){
    //const peopleResponse = await fetch(url);
    const peopleJSON = await getJSON(url);
    const profiles = peopleJSON.people.map( async (person) => {
        const profileJSON = await getJSON(wikiUrl + person.name);

        return {...profileJSON};
    });

        return Promise.all(profiles);
}


//Generate the markup for each profile

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
/* async await let's use combine it with Promises. 
Async await it's just sintactic sugar when it comes to promises
See example below this commented code

btn.addEventListener("click", async (event) => {
    event.target.textContent = "Loading...";

    const astros = await getPeopleInSpace(astrosURL);
    generateHTML(astros);
    event.target.remove();
  });
*/

btn.addEventListener("click", async (event) => {
    event.target.textContent = "Loading...";

    getPeopleInSpace(astrosURL)
        .then(generateHTML)
        .catch( e => {
            peopleList.innerHTML = '<h3>Something went wrong!</h3>';
            console.error(e);
        })
        .finally(() => event.target.remove() )
});