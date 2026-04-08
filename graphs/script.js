// Get the context of the canvas element we want to select
const ctx1 = document.getElementById('myChart');
const ctx2 = document.getElementById('gradeChart');

const gradeInput = document.getElementById('gradeInput');
const nameInput = document.getElementById('nameInput');
const pointsInput = document.getElementById('pointsInput');
const addGradeButton = document.getElementById('addGradeButton');

const graphTypeSelect = document.getElementById('graphTypeSelect');

//SETUP graph variables to store graph instances for later updates
let staticGraph;
let gradeGraph;

//grade data
let gradesData = [
    { name: "Fred", points: 85, grade: 'A' },
    { name: "Sally", points: 92, grade: 'A' },
    { name: "Tom", points: 78, grade: 'C' },
    { name: "Jane", points: 88, grade: 'B' },
    { name: "Bob", points: 95, grade: 'A' }
];

// Event listener to change graph type based on user selection on change event of the dropdown menu. 
// When the user selects a different graph type, the chart's configuration is updated and
//  the chart is refreshed to display the new type.
graphTypeSelect.addEventListener('change', () => {
    const selectedType = graphTypeSelect.value; //get value of selected graph type from dropdown
    staticGraph.config.type = selectedType; // Update the chart type from dropdown selection
    staticGraph.update(); // Refresh the chart to apply the new type
});

//add new grade data from form inputs and update the graph
addGradeButton.addEventListener('click', () => {
    const name = nameInput.value;
    const points = parseInt(pointsInput.value);
    let grade = gradeInput.value.toUpperCase();

    // Add the new grade data to the array
    gradesData.push({ name, points, grade });

    // Update the grade distribution chart
    getGradeDistribution();
});

function getGradeDistribution() {
    const gradeBands = ['A', 'B', 'C', 'D', 'F'];
    const distribution = [0, 0, 0, 0, 0];
    gradesData.forEach(student => {
        const index = gradeBands.indexOf(student.grade);
        //if found -1 returns false not found
        //if the grade is found in the gradeBands array, increment the corresponding count in the distribution array
        if (index !== -1) {
            distribution[index]++;
        }
    });
    // Update the chart with the new distribution data
    gradeGraph.data.datasets[0].data = distribution;
    gradeGraph.update();
}

//new chart object with static data
//writes into ctx1 canvas element and creates a bar chart
//  with specified labels and data points, along with options to start the y-axis at zero for better visualization of the data.
staticGraph = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // x-axis labels for each bar in the chart
        datasets: [{
            label: '# of Votes',
            colors: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'], // background colors for each bar
            data: [12, 19, 3, 5, 2, 3], // y axis data points corresponding to each label on the x-axis
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//new chart for grade distribution graph with initial empty data that will be updated as new grades are added
//  through the form. The chart is configured to display grade bands (A, B, C, D, F) on the x-axis and the count 
// of students in each grade band on the y-axis, starting at zero for better visualization.
gradeGraph = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['A', 'B', 'C', 'D', 'F'],
        datasets: [{
            label: 'Grade Bands',
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'orange'],
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

getGradeDistribution(); //initial call to populate grade distribution chart