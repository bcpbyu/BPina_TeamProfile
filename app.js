const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

var employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questMan = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your managers name? ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your managers ID number? ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your managers email? ',
    },
    {
        type: 'input',
        name: 'extra',
        message: 'What is your managers office number? '
    }
];

const questEng = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your engineers name? ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your engineers ID number? ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your engineers email? ',
    },
    {
        type: 'input',
        name: 'extra',
        message: 'What is your engineers GitHub username? ',
    },
];

const questInt = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your interns name? ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your interns ID number? ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your interns email? ',
    },
    {
        type: 'input',
        name: 'extra',
        message: 'Whats is your interns school? '
    },
];

const questNewEmp = [
    {
        type: 'list',
        name: 'newEmp',
        message: 'Select next employee: ',
        choices: ['Engineer', 'Intern', "I don't want to add anymore"],
    },
]


function newEng(){
    inquirer.prompt(questEng)
    .then((data) => {
        const e = new Engineer(data.name,data.id,data.email,data.extra);
        employees.push(e);
        newEmp();
    });
};

function newInt(){
    inquirer.prompt(questInt)
    .then((data) => {
        const i = new Intern(data.name,data.id,data.email,data.extra);
        employees.push(i);
        newEmp();
    });
};

function newEmp() {
    inquirer.prompt(questNewEmp)
    .then((data) => {
        if (data.newEmp == 'Engineer'){
            newEng();
        }
        else if (data.newEmp == 'Intern'){
            newInt();
        }
        else {
            createPage();
            console.log('Generating Page...')

        }
    });
};

function createPage() {
    const page = render(employees);

    fs.writeFile('main.html', page, 
    (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}

function init() {
    console.log("Input team members");
    inquirer.prompt(questMan)
    .then((data) => {
        const m = new Manager(data.name,data.id,data.email,data.extra);
        employees.push(m);
        newEmp();
    });
    
}

init();

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
