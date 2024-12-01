// VARIABLES
const mainElement = document.querySelector('main')
const courseName = document.querySelector('.course') //shows the course on the quiz 
const enterBtn = document.querySelector('.enter')
const radioBtns = document.querySelectorAll('input[type="radio"]')
const quizGame = document.querySelector('.quiz')
const correctAnswer = document.querySelector('.correct-answer')
const answerStatus = document.querySelector('.show-answer-status')
const card = document.querySelector('.card')
const quizContainer = document.querySelector('.quiz-body')
const scoreBoard = document.querySelector('.score')
const linksContainer = document.querySelectorAll('.course-link')
const questionContainer = document.querySelector('.text')
const questionNumber = document.querySelector('.question-number')
const optionA = document.querySelector('.a')
const optionB = document.querySelector('.b')
const optionC = document.querySelector('.c')
const optionD = document.querySelector('.d')
const InputValueA = document.getElementById('option-a')
const InputValueB = document.getElementById('option-b')
const InputValueC = document.getElementById('option-c')
const InputValueD = document.getElementById('option-d')
const AnswerContainer = document.querySelector('.correct-answer')
const myAnswer = document.querySelector('.my-answer')
const AnswerExplained = document.querySelector('.ans-paragraph')
const nextBtn = document.querySelector('.next')
const exitBtn = document.querySelector('.exit')
const body = document.querySelector(".quiz-container")
const logoSpan = document.querySelector('.logo-span')
const highlight = document.querySelector('.footer-highlight')
const messageBox = document.querySelector('.middle-header');
let message = document.querySelector('.message')
const mode = document.querySelector('.mode')
let scoreValue = 0;
let quizIndex = 0;
let database = []
let isTimerRunning = false
const count = document.querySelector('.count')
count.classList.toggle('hide')
let countdown = document.querySelector('.countdown')
const difficulty = document.querySelector('.difficulty')



// SHOW THE USERS SELECTED OPTION
const labels = document.querySelectorAll('form > div')
labels.forEach(label => label.addEventListener('click', (e)=> {
  removeClass(labels)
  const radioInput = label.children[0]
  radioInput.checked = true
  label.classList.add('selected')
}))

function removeClass(labels){
  labels.forEach(label => label.classList.remove('selected'))
}


// CHECK IF SCORE IS CORRECT
enterBtn.addEventListener('click', (e)=>{
  e.preventDefault()  
  labels.forEach(label => label.classList.remove('selected'))
  radioBtns.forEach(radioBtn=>{
  if(radioBtn.checked){
    quizContainer.classList.toggle('blur')
    card.classList.toggle('card-show')
    if(radioBtn.value === correctAnswer.value){
      scoreValue += 1
      increaseScore(scoreValue)
      answerStatus.textContent = `correct!😎`
    }
   else{
    answerStatus.textContent = `wrong! 😑`
   }
  }
 })
  })

  // INCREASE SCORE
  function increaseScore(scoreValue){
    scoreBoard.textContent=`${scoreValue}`
  }



linksContainer.forEach(link => {
 link.addEventListener('click',()=>{
  let name = link.children[0].innerHTML
  let index = difficulty.selectedIndex;
  checkIndex(index)
  mode.classList.toggle('hide')
  count.classList.toggle('hide')
  async function abc(){
 try {
  const res = await fetch(`./courses/${name}.json`)
  if(!res.ok){
   throw new Error('failed to fetch')
  }
  const data = await res.json()
  return data
 } catch (error) {
  console.error('error fetching data:', error);
  return console.log('empty field');
  
 }
}
  abc(name).then(course=> {
   ListOfCourses(course,name)
  })
 })
});
 
 //GET ALL COURSES IN THE QUIZ 
function ListOfCourses (course,name){
 let getCourse = course[`${name}`]
 courseName.textContent = name
 if(getCourse){
      mainElement.style = 'display: none'
    quizGame.style = 'display: block'
    database = [...getCourse]
    // database.push(...course)
    radioBtns.forEach(radioBtn=> radioBtn.disabled = false)
    radioBtns.forEach(radioBtn=> radioBtn.checked = false)
    getQuestions(database, quizIndex)
    }
    else{
      showMessage('check back later');
    }
 }

 
// RESET THE GAME
function resetGame(){
 database = []
 quizIndex = 0
 scoreValue = 0
 enterBtn.disabled =false
 mode.classList.toggle('hide')
  count.classList.toggle('hide')
 labels.forEach(item => item.classList.remove('pointer-event'))
 increaseScore(scoreValue)
 removeClass(labels)
 quizContainer.classList.remove('blur')
 card.classList.remove('card-show')
 quizGame.style = 'display: none'
 mainElement.style = 'display: block'
 radioBtns.forEach(radioBtn => radioBtn.checked = false)
}

function shuffle(arr){
 for(let i = arr.length - 1; i > 0; i--){
  let j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// CHANGE TO THE NEXT QUESTION
  function changeQuiz(){
   if(quizIndex + 1 < database.length){
     quizIndex++
   inputQuestion(database, quizIndex)
   }
   else{
    // showMessage(`you scored ${scoreValue} out of ${database.length}`);
    checkHighScore(scoreValue, database.length, courseName.innerHTML)
    labels.forEach(item => item.classList.add('pointer-event'))
   }
    quizContainer.classList.remove('blur')
    card.classList.remove('card-show')
    radioBtns.forEach(radioBtn => radioBtn.checked = false)
  }

  // GET THE QUESTIONS FROM QUIZ
function getQuestions (database, quizIndex){
    shuffle(database)
    inputQuestion(database, quizIndex)
}

// DISPLAY THE QUIZ
function inputQuestion(database, quizIndex){  
  if(database.length !== 0){
  let arr = ['question','options','answer','reason','more','id']
  let arr2 = Object.keys(database[quizIndex])
  if( arr2.includes(...arr)){
    const {question, options, answer, reason} = database[quizIndex]
    questionContainer.innerText = question
    questionNumber.textContent = quizIndex + 1
    optionA.innerText = options.a
    InputValueA.value = options.a
    optionB.innerText = options.b
    InputValueB.value = options.b
    optionC.innerText = options.c
    InputValueC.value = options.c
    optionD.innerText = options.d
    InputValueD.value = options.d
    AnswerContainer.value = answer
    myAnswer.textContent = `Answer = ${answer}`
    AnswerExplained.innerText = `Note = ${reason}`
  }
  else{
    console.log('some fields are missing')
    mainElement.style = 'display: block'
    quizGame.style = 'display: none'
  }
  }
    else {
    console.log('no question yet')
    mainElement.style = 'display: block'
    quizGame.style = 'display: none'
  }
}

exitBtn.addEventListener('click', resetGame)
nextBtn.addEventListener('click', changeQuiz)



// DARK MODE TOGGLE
const toggleBtn = document.querySelector('.toggle')
const toggleBall = document.querySelector('.toggle-ball')
toggleBall.classList.add('move-left')
toggleBtn.addEventListener('click', ()=>{
  if(toggleBall.classList.contains('move-left')){
    toggleBall.classList.remove('move-left')
    toggleBall.classList.add('move-right')
    darkMode()
    logoSpan.style = 'color: #eee'
    highlight.classList.toggle('highlight')
  }
  else{
    toggleBall.classList.remove('move-right')
    toggleBall.classList.add('move-left')
    darkMode()
    logoSpan.style = 'color: #333'
    highlight.classList.toggle('highlight')
  }
})

function darkMode(){
  body.classList.toggle('body-dark-mode')
  card.classList.toggle('body-dark-mode')
}

function showMessage(content){
  messageBox.classList.add('show-message')
  message.innerHTML = `${content}`
  setTimeout(() => {
  messageBox.classList.add('slide-out')
  }, 6000);
  setTimeout(() => {
  messageBox.classList.remove('slide-out')
   messageBox.classList.remove('show-message')
  message.innerHTML = `` 
  }, 6350);
  
}


function checkHighScore(score, totalQuestions, name ){
  if(score >= totalQuestions / 2){
    let words = `THE LAW! seems ${name} was too easy`
    showMessage(words)
  }
  else{
    let words = `Na like this you wan write Bar finals??`
    showMessage(words)
  }
 }


function stopWatch(minutes){
  let duration = minutes * 60
  let endTime = new Date().getTime()/1000 + duration
  let IntervalId = setInterval(() => {
    let currentTime = new Date().getTime()/1000
    let remainingTime = endTime - currentTime

    if(remainingTime <= 0){
      showMessage('your time is up')
      showMessage(`you scored ${scoreValue} out of ${database.length}`)
      clearInterval(IntervalId)
      resetGame()
    }
    else{
      let mins = Math.floor(remainingTime / 60)
      let sec = Math.floor(remainingTime % 60)
      // console.log(`${mins}: ${sec}`);
      countdown.textContent = `${mins} : ${sec}` 
    }
    exitBtn.addEventListener('click',()=>{
      clearInterval(IntervalId)
    })
  }, 1000);
}

function checkIndex (index){
  if (index === 0){
    stopWatch(30)
  }
  else if(index === 1){
    stopWatch(20)
  }
  else if (index === 2){
    stopWatch(15)
  }
}
