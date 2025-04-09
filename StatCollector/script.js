const teamStatsOutput = document.getElementById("teamStatsOutput");
const playerStatsOutput = document.getElementById("playerStatsOutput");

var players = [
    { no: 1, name: "Player 1", stats: { points: 10, assists: 5, rebounds: 7 }, games: [] },
    { no: 2, name: "Player 2", stats: { points: 15, assists: 3, rebounds: 10 }, games: [] },
    { no: 3, name: "Player 3", stats: { points: 20, assists: 8, rebounds: 5 }, games: [] }
]

//add up all the team stats for the team total stats
sumUpTeamStats();
createPlayerStatsArea();

function sumUpTeamStats() {
    //create an object to hold the team stats
    let teamStats = {
        points: 0,
        assists: 0,
        rebounds: 0
    };
    //loop through all the players and add up their stats for a grand total
    players.forEach(player => {
        teamStats.points += player.stats.points;
        teamStats.assists += player.stats.assists;
        teamStats.rebounds += player.stats.rebounds;
    });

    //display the team stats in the team stats area
    teamStatsOutput.innerHTML = `Total Points: ${teamStats.points}<br>Total Assists: ${teamStats.assists}<br>Total Rebounds: ${teamStats.rebounds}`;
    teamStatsOutput.style.display = "block";
}
//loop through all the players and create a table row for each player with their stats
function createPlayerStatsArea() {
    for (let i = 0; i < players.length; i++) {
        //create the rows and required cells
        let row = playerStatsOutput.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = players[i].no;
        cell2.innerHTML = players[i].name;
        //create a button to increase the player points
        let pointBut = document.createElement("button");
        pointBut.innerHTML = "Points: " + players[i].stats.points;
        pointBut.onclick = function () {
            players[i].stats.points++;
            pointBut.innerHTML = "Points: " + players[i].stats.points;  //update the button text
            sumUpTeamStats(); //update team stats
        };
        cell3.appendChild(pointBut);
        //create a button to increase the player assists
        let assistBut = document.createElement("button");
        assistBut.innerHTML = "Assists: " + players[i].stats.assists;
        assistBut.onclick = function () {
            players[i].stats.assists++;
            assistBut.innerHTML = "Assists: " + players[i].stats.assists;
            sumUpTeamStats(); //update team stats
        };
        cell4.appendChild(assistBut);
        //create a button to increase the player rebounds
        let reboundBut = document.createElement("button");
        reboundBut.innerHTML = "Rebounds: " + players[i].stats.rebounds;
        reboundBut.onclick = function () {
            players[i].stats.rebounds++;
            reboundBut.innerHTML = "Rebounds: " + players[i].stats.rebounds;
            sumUpTeamStats();   //update team stats
        };
        cell5.appendChild(reboundBut);

    }
}

//example function to adda new round for stat collection
////it creates a new game object and adds it to the games array property in players
//for this to work you need to extend the function abouve to record stats in the game object as well
function addNewround(round) {
    for (let i = 0; i < players.length; i++) {
        let gameStats = {
            date: new Date().toLocaleDateString(),
            round: round,
            points: 0,
            assists: 0,
            rebounds: 0
        };
        players[i].games.push(gameStats);
    }
}