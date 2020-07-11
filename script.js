var elAddUBtn;
var elDoubleMBtn;
var elShowMBtn;
var elSortBWBtn;
var elCalculateWPBtn;
var elEntries;
var userData = [];

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.wealth = Math.floor(Math.random() * 2000000);
  }
}
var moneyFormat = (num) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
var populateTable = () => {
  elEntries.innerHTML = "";
  for (let item of userData) {
    var innerHtmlAdd = `<div class="entry" id="entry${userData.length - 1}">
    <strong>${item.firstName} ${item.lastName}</strong> &#x20B9;${moneyFormat(
      item.wealth
    )}</div>`;
    elEntries.innerHTML += innerHtmlAdd;
  }
};
var addUser = () => {
  console.log("add user");
  var userJson = fetch("https://randomuser.me/api").then((res) => res.json());
  userJson.then((res) => {
    let currUser = new User(
      res["results"][0]["name"]["first"],
      res["results"][0]["name"]["last"]
    );
    userData.push(currUser);
    //console.log(currUser.firstName, currUser.lastName, currUser.wealth);
    /*for (let curUser of userData) {
      console.log(curUser.firstName, curUser.lastName, curUser.wealth);
    }*/
    populateTable();
  });
};
var doubleMoney = () => {
  console.log("double wealth");
  userData = userData.map((item) => {
    item.wealth *= 2;
    return item;
  });
  populateTable();
};
var showMillionaires = () => {
  console.log("show millionaires");
  userData = userData.filter((item) => {
    if (item.wealth >= 1000000) return item;
  });
  populateTable();
};
var sortByWealth = () => {
  console.log("sort by wealth");
  userData = userData.sort((item1, item2) => {
    if (item1.wealth < item2.wealth) return 1;
    else if (item1.wealth > item2.wealth) return -1;
    else return 0;
  });
  populateTable();
};
var calcWealth = () => {
  console.log("calculate wealth");
  // sum = userData.reduce((sum, item) => {
  //   sum += Number(item.wealth);
  //   return sum;
  // }, 0);
  sum = userData.map((item) => item.wealth).reduce((a, b) => a + b);
  console.log(sum);
  var innerHtmlAdd = `<div class="entry total" id="total">
    <strong>Total</strong> &#x20B9;${moneyFormat(sum)}</div>`;
  elEntries.innerHTML += innerHtmlAdd;
};

var el_init = () => {
  elAddUBtn = document.getElementById("addUser");
  elDoubleMBtn = document.getElementById("doubleMoney");
  elShowMBtn = document.getElementById("showMillionaires");
  elSortBWBtn = document.getElementById("sortByWealth");
  elCalculateWPBtn = document.getElementById("calculateWealthPool");
  elEntries = document.getElementById("entries");
};

var eventListener_init = () => {
  elAddUBtn.addEventListener("click", addUser);
  elDoubleMBtn.addEventListener("click", doubleMoney);
  elShowMBtn.addEventListener("click", showMillionaires);
  elSortBWBtn.addEventListener("click", sortByWealth);
  elCalculateWPBtn.addEventListener("click", calcWealth);
};

var init = () => {
  el_init();
  eventListener_init();
};

init();
