const output = document.getElementById('data-container');

//example calls
//http://ergast.com/api/f1/2023/drivers.json
//http://ergast.com/api/f1/2023/races.json

//when the user clicks the button, fetch the data by using the values from the input fields
function fetchData() {
    const year = document.getElementById('season').value;
    const round = document.getElementById('round').value;
    output.innerHTML = ""; // Clear previous results
    getData(round, year);
}

//fetch the data from the API and display it on the page based on season and round
//it will display the race location, driver name, team name and position
function getData(round, year) {
    //fetch the data from the API
    fetch(`http://ergast.com/api/f1/${year}/${round}/results.json`)
        .then(response => response.json())
        .then(data => {
            //get the race name
            const race = data.MRData.RaceTable.Races[0].Circuit.circuitName;
            console.log(race);
            const results = data.MRData.RaceTable.Races[0].Results;
            //loop through the results and get the driver name, constructor name and position
            output.innerHTML = `<h2>${race}</h2>`;
            for (let i = 0; i < results.length; i++) {
                const driver = results[i].Driver.givenName + " " + results[i].Driver.familyName;
                const constructor = results[i].Constructor.name;
                const position = results[i].position;
                console.log(`Driver: ${driver}, Team: ${constructor}, Position: ${position}`);
                output.innerHTML += `<div class="card"><h2>${driver}</h2><p>Constructor: ${constructor}</p><p>Position: ${position}</p></div>`;
            }
        })
}
