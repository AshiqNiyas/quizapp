const welcomecontainer = document.querySelector('#welcomecontainer')
const questioncontainer = document.querySelector('#questioncontainer')
const nameinput = document.querySelector('.nameinput')
const playername = document.getElementById('playername')
const playerscore = document.getElementById('playerscore')
const start = document.getElementById('start')
const optiondisplay = document.querySelector('.options')
const questiondisplay = document.querySelector('.questiondis')
const resultdisplay = document.querySelector('.result')
const displayscore = document.getElementById('resultscore')
let score = 0
let index = 0
let questions;
let farray;
let myarray;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;

  }

function showname(){
    if(nameinput.value == '') return
    welcomecontainer.style.display = 'none'
    questioncontainer.style.display = 'block'
    playername.innerHTML = nameinput.value
    getquiz()
}


async function getquiz(){
    let url = "https://the-trivia-api.com/api/questions?limit=5"
    try{
      let res = await fetch(url)
      questions = await res.json();
      console.log(questions)
    }
    catch(err){
      console.log(err)
    }
    showquestion()
    getoptions()
  }

  function showquestion(){
    questiondisplay.innerHTML = questions[index].question 
  }
  
  function getoptions(){
    optiondisplay.innerHTML = ''
    questions[index].incorrectAnswers.push(questions[index].correctAnswer)
    myarray = shuffle(questions[index].incorrectAnswers)
    // optiondisplay.innerHTML = myarray
    myarray.forEach(opt => {
      let btn = document.createElement('button')
      btn.classList.add('optionbtn')
      btn.innerText = opt
      btn.addEventListener('click',()=>{
        if(opt == questions[index].correctAnswer){
            console.log('right');
            score +=1
        }
        nextquestion()
      })
      optiondisplay.append(btn)
      playerscore.innerHTML = score
    });
  
    
  }
  
  function nextquestion(){
    if(index == 4){
        questioncontainer.style.display = 'none'
        resultdisplay.style.display = 'flex'
        displayscore.innerHTML = score
    }
    index ++
    showquestion()
    getoptions()
  }
 


  function resetgame(){
    questioncontainer.style.display = 'block'
    resultdisplay.style.display = 'none'
    score = 0
    index = 0
    getquiz()
    showquestion()
    getoptions()
  }