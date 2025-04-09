const output = document.getElementById("output");

getDataFromAPI();
function getDataFromAPI() {
    var myHeaders = new Headers();
    //use your own API key here
    myHeaders.append("x-rapidapi-key", "8576336b5db5c4701177d0ffb6ddf611");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    //get the specific request -you need to use the website to find the ids you require. You can test this in the dashboard online
    fetch("https://v3.football.api-sports.io/teams/statistics?league=118&season=2023&team=948", requestOptions)
        .then(response => response.json())               //convert the response to json rather than text
        .then(result => printData(result.response))     //set the data to the function printData
        .catch(error => console.log('error', error));   //return an error if the request fails
}

//function to print the data to the console and create a div element
function printData(data) {
    console.log(data);
    // Create a table element
    const div = document.createElement("div");
    //to access the data we need to use the dot notation to access the data we require
    //we can use the console to find the data we require and enter below
    div.innerHTML = `Wins: ${data.goals.for.average.home} <br>
    `;
    //add the div to the output element in the html
    output.appendChild(div);
}