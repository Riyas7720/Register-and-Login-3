var SHEET_ID = '';// Add your Google sheet ID here.
var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Users");//Change to your sheet name.

function doGet(e) {
  var page = e.parameter.page || 'login';
  return HtmlService.createTemplateFromFile(page).evaluate().setTitle(page.charAt(0).toUpperCase() + page.slice(1));
}

function redirectToMain() {
  return HtmlService.createTemplateFromFile('main').evaluate();
}

function processLogin(username, password) {
  var response = { success: false, message: '' };
  var users = getUsers();

  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      response.success = true;
      return response;
    }
  }

  response.message = 'Invalid username or password';
  return response;
}

function processSignup(fullname, email, username, password) {
  var response = { success: false, message: '' };
  var users = getUsers();

  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      response.message = 'Username already exists';
      return response;
    }
  }

  var newUser = [fullname, email, username, password];
  sheet.appendRow(newUser);
  response.success = true;
  return response;
}

function logoutUser() {
  return true;
}

function getUsers() {
  var data = sheet.getDataRange().getValues();
  var users = [];

  for (var i = 1; i < data.length; i++) {
    var user = {
      fullname: data[i][0],
      email: data[i][1],
      username: data[i][2],
      password: data[i][3]
    };
    users.push(user);
  }

  return users;
}
