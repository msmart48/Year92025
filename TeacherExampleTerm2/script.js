const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addNameButton');
const nameListButtons = document.getElementById('nameListButtons');
const playerSummaryTableBody = document.getElementById('playerSummaryTableBody');

let selectedPlayer = null; //keep track of selected player id

let playerStats = [
    { name: "John Smith", pass: 0, serve: 0, dig: 0 },
    { name: "Jane Doe", pass: 0, serve: 0, dig: 0 },
    { name: "Mike Johnson", pass: 0, serve: 0, dig: 0 }
];



//pass a stat name to the handleStat function and it will increment that stat for the selected player and update the summary table
function handleStat(stat) {
    if (!selectedPlayer) return; // No player selected

    const player = playerStats.find(p => p.name === selectedPlayer); //search for player object in playerStats array with name that matches selectedPlayer
    if (!player) return;

    player[stat]++; //increment the stat for the player
    updatePlayerSummaryTable();
}

// Event listeners
document.getElementById('passButton').addEventListener('click', () => handleStat('pass'));
document.getElementById('serveButton').addEventListener('click', () => handleStat('serve'));
document.getElementById('digButton').addEventListener('click', () => handleStat('dig'));
document.getElementById('addNameButton').addEventListener('click', addPlayer);

loadPlayerButtons();
updatePlayerSummaryTable();

// Function to update the player summary table with the current stats for each player by writing a new table
function updatePlayerSummaryTable() {
    playerSummaryTableBody.innerHTML = ''; //clear the table body
    for (let player of playerStats) {
        //create a new row for each player and add it to the table body
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.pass}</td>
            <td>${player.serve}</td>
            <td>${player.dig}</td>
        `;
        playerSummaryTableBody.appendChild(row); //adds a new row to the table body for each player in the playerStats array
    }
    updateTeamStats(); //update team stats after updating player summary table
}

//update the team stats by summing the individual stats for each player and updating the team stats display
function updateTeamStats() {
    let teamStats = { pass: 0, serve: 0, dig: 0 }; //reset the team stats counter
    //loop through each player in the playerStats array and add their stats to the team stats counter
    for (let player of playerStats) {
        teamStats.pass += player.pass;
        teamStats.serve += player.serve;
        teamStats.dig += player.dig;
    }
    //update the team stats display with the new totals
    document.getElementById('passCount').textContent = teamStats.pass;
    document.getElementById('serveCount').textContent = teamStats.serve;
    document.getElementById('digCount').textContent = teamStats.dig;
}


// Function to load player buttons from the player list and add click event listeners to them
function loadPlayerButtons() {
    nameListButtons.innerHTML = ''; // Clear existing buttons
    for (let player of playerStats) {
        const playerButton = document.createElement('button');
        playerButton.className = 'button is-light m-1';
        playerButton.textContent = player.name;
        nameListButtons.appendChild(playerButton);
        //click event for the player button
        playerButton.addEventListener('click', function () {
            selectedPlayer = player.name; //get name of player
            //update the label for the selected player
            document.getElementById('selectName').textContent = ' ' + player.name;
        });
    }
}

//add a new player to the playerStats array and update the player buttons and summary table to include the new player
function addPlayer() {
    const newName = nameInput.value.trim();
    if (newName === '') return; // Don't add empty names
    playerStats.push({ name: newName, pass: 0, serve: 0, dig: 0 }); // Add new player to stats array
    nameInput.value = ''; // Clear input field
    loadPlayerButtons(); // Reload player buttons to include the new player
    updatePlayerSummaryTable(); // Update the summary table to include the new player
}


