window.onload = function() {
  start();
};
var k;
var arr = [];
var es;
function sprawdz(x) {
  var element = "lit" + x;

  k = arr.push(x);

  var A = document.getElementById(element).style.backgroundColor = "red";
  var B =document.getElementById(element).style.color = "black";
  var C =document.getElementById(element).style.border = "3px solid black";
  var D =document.getElementById(element).style.cursor = "default";
  var E =document.getElementById(element).setAttribute("onclick", ";");

  if (arr.length >= 6) {
    for (var i = 1; i < 50; i++) {
      es = "lit" + i;
      document.getElementById(es).style.cursor = "pointer";
      document.getElementById(es).setAttribute("onclick", ";");
    }

  }
  
}

Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));

    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

var liczby = [];
for (var i = 1; i <= 49; i++) {
  liczby.push(i);
}

var liczbyWygrane;

function getspr() {
  liczby.shuffle();
  liczbyWygrane = 0;
  for(i = 0; i <= 5; i++) {
    for(j = 0; j <= 5; j++) {
      if(liczby[i] == arr[j]) {
        liczbyWygrane += 1;
        break;
      }
    }
  }
};

function spr() {

  if (arr.length != 6) {
    alert("First you need to select 6 figures"); 
  } 
  
  else {
    if (arr.length >= 6) {
      
      for(i = 0; i <= 5; i++) {
        document.getElementById("l" + (i + 1)).innerHTML = liczby[i];
      }
    } else {
      alert("First you need to select 6 numbers");
    }

    for (var i = 1; i <= 49; i++) {
      liczby.push(i);
    }

    document.getElementById("napis").innerHTML =
    liczbyWygrane + " out of 6 won";
  }
}

var cyfry = new Array(49);

for (i = 1; i <= 49; i++) {
  cyfry[i] = i;
}

async function start() {
  document.getElementById("napis").innerHTML = "The winning lottery number is shown here.";
  var tresc_diva = "";

  for (i = 1; i <= 49; i++) {
    var element = "lit" + i;
    tresc_diva =
      tresc_diva +
      '<input type="button" value="' +
      cyfry[i] +
      '" class="litera" onclick = "sprawdz(' +
      i +
      ')" id="' +
      element +
      '"></div>';
      //console.log(cyfry[i])
  }
  document.getElementById("alfabet").innerHTML = tresc_diva;
}

function restart() {
  while(arr.length > 0) {
    arr.pop();
    liczby.pop();
  }
  k = null;
  element = null;
  es = null;
  document.getElementById("editThisk").disabled=false;
  document.getElementById("editThisk").style.cursor = "pointer";
  getspr();
  start();
  ERC20.gameResult();
}