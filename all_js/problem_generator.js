var answer, q, rep, change_score;
var total_problems = 0;
var correct_problems = 0;
var problems = false;
window.timer = false;

const combinatorics = ['../subjects/K_combinatorics/k_factorial.js',
                       '../subjects/K_combinatorics/k_permutation.js',
                       '../subjects/K_combinatorics/k_anagrams.js'];

const subjects = [combinatorics];

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function createProblem() {

  window.timer = false;
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
  totalSeconds = 0;

  //Loading symbol
  document.getElementById("command").innerHTML = '<div class="fa-3x" style="text-align: center;"><i class="fa-solid fa-pen fa-shake" style="--fa-animation-duration: 5s;"></i></div>';

  //Closing all accordions
  let active = document.querySelectorAll(".accordion-div .accordion.active");
  for(let j = 0; j < active.length; j++){
    active[j].classList.remove("active");
    active[j].nextElementSibling.style.maxHeight = null;
  }
  
  //Allows for the score to be updated
  change_score = true;

  //Clearing form input
  var getValue = document.getElementById("user_answer");
    if (getValue.value !="") {
      getValue.value = "";
    }
  document.getElementById("start").textContent = "Novo problema";
  document.getElementById("table").hidden = false;
  document.getElementById("ans_details").hidden = true;
  document.getElementById("correct_or_not").hidden = true;

  //Picking a level
  var levels = document.getElementsByName("level");
  var checked_level = Array.from(levels).find((radio) => radio.checked);
  var lv = parseInt(checked_level.value);
  if (lv == 4) {
    var lv = randint(0,2);
  }
  
  //Picking a subject (only combinatorics for now)
  var sub = subjects[Math.floor(Math.random() * subjects.length)];

  //Picking a topic
  var available_topics = document.getElementsByName("topic");
  var checked_topic = Array.from(available_topics).find((radio) => radio.checked);
  var topic_index = parseInt(checked_topic.value);
  if (topic_index == 4) {
    var topic = sub[Math.floor(Math.random() * sub.length)]; //url
  } else {
    var topic = combinatorics[topic_index];
  }

  $.getScript(topic, function(a) {
    eval(a);
    var pr = problems[lv][Math.floor(Math.random() * problems[lv].length)];
    var exp = pr.replace(pr.command, pr.ans, pr.math, pr.when);
    answer = exp[4];

    document.getElementById("command").innerHTML = exp[0];
    document.getElementById("correct_answer").innerHTML =  exp[1];
    document.getElementById("how_did_you_do_that").innerHTML = exp[2];
    document.getElementById("when_should_i_do_it").innerHTML = exp[3];
    window.timer = true;
  });
}

function showAnswer() {
    window.timer = false;
    ans = document.getElementById("user_answer").value;
    document.getElementById("correct_or_not").hidden = false;
    document.getElementById("ans_details").hidden = false;
    if (answer == ans) {
        if (change_score == true) {
          total_problems++;
          correct_problems++;
          change_score = false;
        }
        document.getElementById("correct_or_not").style.color = "green";
        document.getElementById("correct_or_not").innerHTML =
            "<i class='fas fa-check-circle fa-fw w3-margin-right w3-large w3-text-green'></i>Resposta correta!";
    }
    else {
        if (change_score == true) {
          total_problems++;
          change_score = false;
        }
        document.getElementById("correct_or_not").style.color = "red";
        document.getElementById("correct_or_not").innerHTML =
        "<i class='fas fa-times-circle fa-fw w3-margin-right w3-large w3-text-red'></i>Resposta errada!";
    }
    document.getElementById("score").innerHTML = correct_problems + "/" + total_problems;
}

function resetScore() {
  total_problems = 0;
  correct_problems = 0;
  document.getElementById("score").innerHTML = "0/0";
}

function factorialize(num) {
  if (num < 0) 
        return -1;
  else if (num == 0) 
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}

function count_repeat(str) {
  const letters = new Map();
  for( let i = 0 ;i < str.length ;i++) {
    let count = 0;
    for( let j = 0 ;j < str.length ;j++) {
      if( str[i] == str[j] && i > j  ) {
       break;
      }
      if( str[i] == str[j]  ) {
        count++;
      }
    }
    if( count > 1) {
    letters.set(str[i], count)
    }
  }
  return letters
}

function simplify(num, den) {
  if (num < den) {
    var ref = num;
  } else {
    var ref = den;
  }

  for (var i = 1; i<=ref; i++) {
    if ((num%i == 0) && (den%i == 0)) {
      num = num/i;
      den = den/i;
    }
  }
  
  return [num, den]
}

function makeFrac(num, den) {
  var frac = "<table class='frac'><tr class='num'><td>NUM</td></tr>";
  frac += "<tr><td style='text-align:center;'>DEN</td></tr></table>";
  frac = frac.replace('NUM', num);
  frac = frac.replace('DEN', den);
  return frac;
}