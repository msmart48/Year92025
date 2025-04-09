const questionOutput = document.getElementById("questionOutput");
const answerButtons = document.getElementById("answerButtons");
var qcount = 0;

//below are the questions and answers which include options for each button this can be changed to any question and answer
//this is a simple quiz that will ask the user a question and give them options to choose from and assign points to the subjects based on the answer they choose
var questions = [
    {
        q: "Do you like being outside?",
        options: [
            { text: "yes", subjects: ["PE"] },
            { text: "no", subjects: ["Math", "Science", "History"] }
        ]
    },
    {
        q: "Do you enjoy solving puzzles or logic problems?",
        options: [
            { text: "yes", subjects: ["Math", "Science"] },
            { text: "no", subjects: ["History", "PE"] }
        ]
    },
    {
        q: "Would you rather do a science experiment or write an essay?",
        options: [
            { text: "Science experiment", subjects: ["Science"] },
            { text: "Write an essay", subjects: ["History"] }
        ]
    },
    {
        q: "Do you prefer learning through physical activity or reading?",
        options: [
            { text: "Physical activity", subjects: ["PE"] },
            { text: "Reading", subjects: ["History", "Science"] }
        ]
    }
];

//list of categories and points for each category
var categories = [{ name: "PE", points: 0 }, { name: "Math", points: 0 }, { name: "Science", points: 0 }, { name: "History", points: 0 }];

//start here
printQuestions(qcount);

//printQuestions function will take the id of the question and print it to the screen
function printQuestions(id) {
    if (id >= questions.length) {
        //if all questions are answered, show results
        questionOutput.innerHTML = "You have completed the quiz!";
        answerButtons.innerHTML = ""; //clear answer buttons
        showResults();
    } else {
        //output the question to the screen
        questionOutput.innerHTML = questions[id].q;
        //clear answerButtons
        answerButtons.innerHTML = "";
        //loop through the options and create buttons for each one
        //loop through the options and create buttons for each one
        for (let i = 0; i < questions[id].options.length; i++) {
            let option = questions[id].options[i]; // capture the current option
            let but = document.createElement("button");
            but.innerHTML = option.text;
            but.addEventListener("click", function () {
                //add the subjects to the categories
                addPoints(option.subjects);
                //trigger next question to be started
                printQuestions(id + 1);
            });
            //append the buttons to the screen
            answerButtons.appendChild(but);
        }
    }
}

//this function takes an array of subjects and adds points to the categories based on the subjects chosen
function addPoints(subjects) {
    //loop over passed subjects array
    for (let i = 0; i < subjects.length; i++) {
        //loop over each category and check if the name matches the subject
        //if it does, add points to that category
        for (let j = 0; j < categories.length; j++) {
            if (categories[j].name === subjects[i]) {
                categories[j].points += 1;
            }
        }
    }
}

//this function will show the results of the quiz
//it will loop through the categories and display the results in a new div`
function showResults() {
    //sort the categories by points in descending order
    categories.sort(function (a, b) {
        return b.points - a.points;
    });
    //loop through the categories and display the results
    for (var i = 0; i < categories.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = categories[i].name + ": " + categories[i].points;
        answerButtons.appendChild(div);
    }
}