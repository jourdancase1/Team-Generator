const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamList = [];
function createManager(){
    inquirer.prompt([
    {
        "name": 'name', 
        "type": 'input', 
        "message": 'Enter manager name:'
    },
    {
        "name": 'id', 
        "type": 'input',
        "message": 'Enter manager id:'
    },
    {
        "name": 'email',
        "type": 'input',
        "message": 'Enter manager email:'
    },
    {
        "name": 'office',
        "type": 'number',
        "message": 'Enter manager office number'
    }
    ]).then(function(answers){
        const manager = new Manager(answers.name, parseInt(answers.id), answers.email, parseInt(answers.office));
        teamList.push(manager)
        console.log(teamList)
        addEmployee();
    })
}

function renderHTML(){
    let renderedTeam = render(teamList);
    console.log(renderedTeam);
    fs.writeFileSync('team.html', renderedTeam, (err)=>{
        console.log(err);
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            "type": "list",
            "name": "type",
            "message": "Which type of team member would you like to add?",
            "choices": [
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ]).then(function(answer){
        if(answer.type === 'Engineer'){
            createEngineer();
        } else if (answer.type === 'Intern'){
            createIntern();
        } else if(answer.type === 'Done'){
            renderHTML();
        } else {
            console.log('error')
        }
    })
}

function createEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github?"
        }
    ]).then(function(answers){
        const engineer = new Engineer(answers.name, parseInt(answers.id), answers.email, answers.github);
        teamList.push(engineer);
        console.log(teamList)
        addEmployee();
    })
}

function createIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        }
    ]).then(function(answers){
        const intern = new Intern(answers.name, parseInt(answers.id), answers.email, answers.school);
        teamList.push(intern);
        console.log(teamList)
        addEmployee();
    })
}
createManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
