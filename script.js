const start = document.querySelector(".start button");
const info = document.querySelector(".information");
const quit = document.querySelector(".buttons .quit");
const proceed = document.querySelector(".buttons .restart");
const quiz = document.querySelector(".quiz");
const option_list = document.querySelector(".option_list");
const count = quiz.querySelector(".timer .seconds");
const off = quiz.querySelector(".timer .left");
// const timeLine = quiz.querySelector("header .timer_line");

start.onclick = ()=>{
    info.classList.add("activeInfo");
}

quit.onclick = ()=>{
    info.classList.remove("activeInfo");
}

proceed.onclick = ()=>{
    info.classList.remove("activeInfo");
    quiz.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    // startTimerLine(0);
}

let que_count = 0;

let que_num = 1;

let counter;

// let counterLine;

let timeValue = 10;


let userScore = 0;
// let widthValue = 0;

const next_btn = quiz.querySelector(".next_btn");
const result_box = document.querySelector(".result");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}

restart_quiz.onclick = ()=>{
    quiz.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;

    let que_num = 1;

    // let counterLine;

    let timeValue = 10;

    let userScore = 0;

    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    // clearInterval(counterLine);
    // startTimerLine(widthValue);
    next_btn.style.display = "none";
    off.textContent = "Time Left";
}

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        // clearInterval(counterLine);
        // startTimerLine(widthValue);
        next_btn.style.display = "none";
        off.textContent = "Time Left";
    }
    else{
        clearInterval(counter);
        // clearInterval(counterLine);
        showResultBox();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].num + ". " + questions[index].questions +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option_choices = option_list.querySelectorAll(".option");
    for(let i = 0; i < option_choices.length; i++){
        option_choices[i].setAttribute("onclick", "selector(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function selector(answer){
    clearInterval(counter);
    let user = answer.textContent;
    let correct = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(user == correct){
        userScore += 1;
        answer.classList.add("correction");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correct){
                option_list.children[i].setAttribute("class", "option correction");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info.classList.remove("activeInfo");
    quiz.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score");
    if(userScore > 7){
        let scoreTag = '<span>and congrats! You got '+ userScore +' out of '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 5){
        let scoreTag = '<span>and nice. You got '+ userScore +' out of '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only '+ userScore +' out of '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    const counter = quiz.querySelector(".total_que");
    let total_count = '<span><p>'+ index +'</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';
    counter.innerHTML = total_count;
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        count.textContent = time;
        time--;
    }
    if(time < 9){
        let zero = count.textContent;
        count.textContent = "0" + zero;
    }
    if(time < 0){
        clearInterval(counter);
        count.textContent = "00";
        off.textContent = "Time's Up";
        let correct = questions[que_count].answer;
        let allOptions = option_list.children.length;
    
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correct){
                option_list.children[i].setAttribute("class", "option correction");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
        for(let i = 0; i < allOptions; i++){
            option_list.children[i].classList.add("disabled");
        }
        next_btn.style.display = "block";
    }
}

// function startTimerLine(time){
//     counterLine = setInterval(timer, 29);
//     function timer(){
//         time += 1;
//         timeLine.style.width = time + "px";
//         if(time > 549){
//             clearInterval(counterLine);
//         }
//     }
// }