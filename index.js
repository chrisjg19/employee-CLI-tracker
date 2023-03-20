const mysql = require('mysql');
const inquirer = require('inquirer');
require ('console.table');
require ('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeTracker_db'
});

connection.connect(function (err) {
    if (err) throw err;
    initPromt();
  });

function initPrompt() {
    inquirer.createPromptModule({
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [

        "View All Employees",
        "Add Employee",
        "View All Departments",
         "Add Department",
        "View All Roles",
          "Add Role",
        "Update Employee Role",
        "Exit"
        
        ]
    })
    .then(function (answer) {
        switch (answer.initPromt) {
          case "View All Employees":
            viewEmployees();
            break;
          
          case "Add Employee":
            addEmployee();
            break;
        
          case "View All Departments":
            viewDepartments();
            break;
  
          case "Add Department":
            addDepartment();
            break;
  
          case "View All Roles":
            viewRoles();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
};

function viewEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.query(query, function (err, res) {
      console.table(res);
      initPrompt();
    });
  };
  
  function viewDepartments() {
    var query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
      console.table(res);
      initPrompt();
    });
  };
  
  function viewRoles() {
    var query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
      console.table(res);
      initPrompt();
    });
  };

  function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee First name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee Last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Employee Role ID:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Employee Manager ID:'
        }
    ])
        .then((answer) => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, results) => {
                if (err) throw err;
                console.log('Employee added :)');
                initPrompt();
            });
        });
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'Enter department name:'
    })
        .then((answer) => {
            db.query('INSERT INTO department (name) VALUES (?)', answer.department, (err, results) => {
                if (err) throw err;
                console.log('Department added.');
                initPrompt();
            });
        });
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department id:'
        }
    ])
        .then((answer) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, answer.department_id], (err, results) => {
                if (err) throw err;
                console.log('Role added.');
                initPrompt();
            });
        });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter new role ID:'
        }
    ])
        .then((answer) => {
            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], (err, results) => {
                if (err) throw err;
                console.log('Employee role updated.');
                initPrompt();
            });
        });
};

initPrompt();