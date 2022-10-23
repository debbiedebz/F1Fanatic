//The code parts here are to be pasted on Console
//There are two things that the scripts here were made for:
//1 TO CHECK THE NUMBER OF RACES FOR ANY YEAR - this is something to use if you want to be the person who's want to prove you're an F1 fanatic
//  by telling people you can say how many races happen on any year or particular seasons. When you run this, you will be asked for a year to check.
//  note that I did not add validations for this part since this is meant to be confirmed on the 2nd part of the code below.
//2 TO CHECK IF WHAT YOUR F1 FANATIC FRIEND SAID IS TRUE - use this if you have that friend who claims that he is the fan in #1 to know if his
//  claims are correct or not.  I also added some validations to filter if the values entered by the user are valid or not. When you run this, it will 
//  ask first for a year, followed by a season. If the values entered are valid, it will check the data in the endpoint and search how many races 
//  happened in the given year and if the claims of your friend is true or not. Validations were based on the API documentation that it only supports 
//  1950 onwards and shows only 2-digits for the number of races per year.
//INITIAL CHECK - this was just made initially to check the number of races for 2017 while trying out getting values with Json since XML seems to be 
//the default.
//Date Created: 24Oct2022
//Author: Debra Bula

//----------------- INITIAL CHECK: TO CHECK THE NUMBER OF RACES FOR 2017 -----------------
const getTotal = async () => {
  const response = await fetch('https://ergast.com/api/f1/2017.json');
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log("Total: " + myJson.MRData.total);
  return myJson;
}
getTotal();

//---------------- TO CHECK THE NUMBER OF RACES FOR ANY YEAR ------------------------------
var season = prompt("Hello! What year do you want to check?");
var newEndpoint = "https://ergast.com/api/f1/" + season + ".json";
const getTotal = async () => {
  const response = await fetch(newEndpoint);
  const myJson = await response.json();
  const numberOfRaces = myJson.MRData.total;
  console.log("Total Races: " + numberOfRaces);
  alert("There are " + numberOfRaces + " F1 races last " + season + ".");
  return myJson;
}
getTotal();

//--------------- TO CHECK IF WHAT YOUR F1 FANATIC FRIEND SAID IS TRUE --------------------
//Input - Friend's Statement: There are var_raceNumber_claim/races last var_season/year

//get the current date
var var_currentYear = new Date().getFullYear();
console.log("DEBUG: Current year " + var_currentYear);

//Create the function that will check the date
//VALIDATION FOR YEAR ENTERED:
function storeYear(){
    //create a function that will ask for the year so that we don't have to repeat printing it over
    function askForYear(){
        var_season = prompt("What year again?");
    }
    //if there is no value entered before OK is clicked/null
    if (var_season == "") {
      alert("It seems you forgot to enter a year. Please reenter."); 
      var_isSeasonValid = false;
      askForYear(); //var_season = prompt("What year again?");
    } else
    //if year is before 1950 or less than 4-digits
    if ( var_season <= 1949 ) { 
        alert("Please enter another year. There wasn't any F1 Races yet recorded on the API before 1950");
        var_isSeasonValid = false;
        askForYear(); //var_season = prompt("What year again?");
    } else
    //if the year entered is more than the current Year
    //DEBUG
    if ( var_season > var_currentYear ) { 
        alert("Please enter another year. We're not going to predict the future here! lol"); 
        var_isSeasonValid = false;
        askForYear(); //var_season = prompt("What year again?");
    } else
    //do these only when you get a valid season or year number
    var_isSeasonValid = true;
    return var_season;
    return var_isSeasonValid;
  }

//ask for the year. Example: 2017
var var_season = prompt("What year or season should we check?");//19
var var_isSeasonValid;
console.log("DEBUG: Season/Year entered :" + var_season);
    storeYear(var_season, var_currentYear);
  while ( var_isSeasonValid != true ){
    storeYear(var_season);
  }
  alert("DEBUG: var_raceNumber_claim = " + var_season );
  alert("DEBUG: onto the next part!");

//VALIDATION FOR THE NUMBER OF RACES CLAIMED:
function storeRaceClaims(){
  if (var_raceNumber_claim == "") { 
    alert("It seems you forgot to enter a number. Please re-enter."); 
    var_isRaceNumberValid = false;
    var_raceNumber_claim = prompt("How many races again?");
  } else
  //Note: zero should be acceptable if there is any year without any races.
  //if the value entered is 3-digits or more since according to API documentation, it is invalid.
  //this parameter should only have or accept 1 or 2 digits
  if ( var_raceNumber_claim >= 100 ) { 
    alert("That's a long shot! There's no year in F1 history where they had a hundred races or more in a year."); 
    var_isRaceNumberValid = false;
    var_raceNumber_claim = prompt("How many races again?");
  } else 
  //if the value entered is not a number
  if ( isNaN(var_raceNumber_claim) == true ) { alert("Please enter a number. That's not a number!"); 
    var_isRaceNumberValid = false;
    var_raceNumber_claim = prompt("How many races again?");
  }
   var_isRaceNumberValid = true;
   return var_raceNumber_claim;
   return var_isRaceNumberValid;
}
var var_raceNumber_claim = prompt("How many races?");//19
var var_isRaceNumberValid;
  storeRaceClaims(var_raceNumber_claim);
  while (var_isRaceNumberValid != true ){
    storeRaceClaims(var_raceNumber_claim);
  }
  alert("DEBUG: var_raceNumber_claim = " + var_raceNumber_claim );
  alert("DEBUG: onto the next part!");


//CREATE VARIABLE TO STORE THE CORRECT ENDPOINT TO CONNECT TO
//since the format is endpoint up to "F1", we need to add the season or year number followed by ".json" to get the response
//in json format 
var newEndpoint = "https://ergast.com/api/f1/" + var_season + ".json";

//GET THE WHOLE API:
const getTotal = async () => {
  const response = await fetch(newEndpoint);
  const myJson = await response.json();
  var raceNumber_actual = myJson.MRData.total;

//STORE VALUES THAT YOU GET FOR DEBUGGING REFERENCES
  console.log("VALUES CHECKING:")
  console.log("Season: " + var_season);
  console.log("Claimed number of races: " + var_raceNumber_claim);
  console.log("Actual number of races: " + raceNumber_actual);

//ANALYSIS IF WHAT YOUR FRIEND SAID IS TRUE:
  if ( var_raceNumber_claim != raceNumber_actual ){
    alert("FAIL: That's a lie! There were " +  raceNumber_actual + " races, not " + var_raceNumber_claim + " last " + var_season);
  }
  else {
    alert("PASSED: Correct! There were " +  raceNumber_actual + " races last " + var_season);
  };
  console.log("Total Races: " + raceNumber_actual);
  return myJson;
}
getTotal();

