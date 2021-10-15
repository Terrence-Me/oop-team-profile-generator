const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/render_html");
const OUTPUTDIR = path.resolve(__dirname, "public");
const outputfile = path.join(OUTPUTDIR, "index.html");
const teamArr = [];
let newMember = "";

function employeeQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter team member's name",
        name: "answerName",
      },
      {
        type: "input",
        message: "What is their Employee ID?",
        name: "answerID",
      },
      {
        type: "input",
        message: "Enter Employee Email Addiress",
        name: "answerEmail",
      },
      {
        type: "list",
        message: "Select the Employee's role",
        name: "answerRole",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((data) => {
      answers = data;
      if (data.answerRole === "Manager") {
        managerA(data);
      } else if (data.answerRole === "Engineer") {
        engineer(data);
      } else {
        intern(data);
      }
    });
}

function managerA(addRole) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your office number?",
        name: "answerOfficeNumber",
      },
      {
        type: "confirm",
        message:
          "Thank you for your input! Would you like to add another team member?",
        name: "answerAddTeamMember",
      },
    ])
    .then((data) => {
      newMember = new Manager(
        addRole.answerName,
        addRole.answerID,
        addRole.answerEmail,
        addRole.answerRole,
        addRole.answerOfficeNumber
      );
      console.log(newMember);
      teamArr.push(newMember);
      if (data.answerAddTeamMember === true) {
        employeeQuestions();
      } else {
        renderhtml(newMember);
      }
    });
}

function engineer(addRole) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Github user name?",
        name: "answerGithub",
      },
      {
        type: "confirm",
        message:
          "Thank you for your input! Would you like to add another team member?",
        name: "answerAddTeamMember",
      },
    ])
    .then((data) => {
      newMember = new Engineer(
        addRole.answerName,
        addRole.answerID,
        addRole.answerEmail,
        addRole.answerRole,
        addRole.answerGithub
      );
      console.log(newMember);
      teamArr.push(newMember);
      if (data.answerAddTeamMember === true) {
        employeeQuestions();
      } else {
        renderhtml(newMember);
      }
    });
}
function intern(addRole) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter school or university?",
        name: "answerSchool",
      },
      {
        type: "confirm",
        message:
          "Thank you for your input! Would you like to add another team member?",
        name: "answerAddTeamMember",
      },
    ])
    .then((data) => {
      newMember = new Intern(
        addRole.answerName,
        addRole.answerID,
        addRole.answerEmail,
        addRole.answerRole,
        addRole.answerSchool
      );
      console.log(newMember);
      teamArr.push(newMember);
      if (data.answerAddTeamMember === true) {
        employeeQuestions();
      } else {
        renderhtml(newMember);
        // console.log(rendered);
      }
    });
}

function initialhtml() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <link rel="stylesheet" href="./style.css">
      <title>My Team</title>
  </head>
  
  <body>
      <header class="constainer-fluid bg-info mb-5 text-center header">
          <div class="row">
              <div class="col-12 jumbotron">
                  <h1 class="header_name">My Team</h1>
              </div>
          </div>
      </header>
  
      <main class="container">
          <div class="row">`;
  fs.writeFile(outputfile, html, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
}

function buildTeam(data) {
  const name = data.getName();
  const role = data.getRole();
  const id = data.getId();
  const email = data.getEmail();
  let template = "";
  if (role === "Engineer") {
    const username = data.getGithub();
    template = ` <div class="col-4">
    <div class="card">
        <h5 class="card-header height bg-primary">${name}<br />${role}</h5>
        <ul class="list-group list-group-flush list_pad">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email}</a></li>
            <li class="list-group-item">GitHub Username: ${username}</li>
        </ul>
    </div>
</div>`;
  } else if (role === "Intern") {
    const school = data.getSchool();
    template += `<div class="col-4">
    <div class="card">
        <h5 class="card-header height bg-primary">${name}<br />${role}</h5>
        <ul class="list-group list-group-flush list_pad">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email}</a></li>
            <li class="list-group-item">School: ${school}</li>
        </ul>
    </div>
</div>`;
  } else {
    const officePhone = data.getOfficeNumber();
    template += `<div class="col-4">
    <div class="card">
        <h5 class="card-header height bg-primary">${name}<br />${role}</h5>
        <ul class="list-group list-group-flush list_pad">
            <li class="list-group-item">ID:${id}</li>
            <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email}</a></li>
            <li class="list-group-item">Office Phone: ${officePhone}</li>
        </ul>
    </div>
</div>`;
  }
  return template;
}

function renderhtml() {
  initialhtml();
  const html = `</div>
    </main>
</body>`;
  let template = teamArr.map((employee) => buildTeam(employee));
  return new Promise((resolve, reject) => {
    console.log("success");
    fs.appendFile(outputfile, template.join(""), (err, resoleved) => {
      if (err) {
        return reject(err);
      }
      return resoleved;
    });
    fs.appendFile(outputfile, html, (err, resoleved) => {
      if (err) {
        return reject(err);
      }
      return resoleved;
    });
  });
}

employeeQuestions();
