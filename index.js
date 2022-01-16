
const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 


const fs = require('fs'); 
const inquirer = require('inquirer');


const teamArray = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Team Manager', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Managers Name?");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Managers ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Managers ID")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Managers e-mail",
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log ('Enter Managers e-mail')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Managers Office Number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Please enter an office number!')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log(`
    =============================
    Employees
    =============================
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'Pick Role',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Employees Name', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("enter an employee's name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Employees ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("enter the employee's ID!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'employees email.',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log (' enter an email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message:  'employees github username.',
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ( 'enter the employees github username')
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message:  'interns school',
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("enter the interns school")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        // data for employee types 

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};


// function to generate HTML page file using file system 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        // when the profile has been created 
        } else {
            console.log("Your team profile has been created")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });