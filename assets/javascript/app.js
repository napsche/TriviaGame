var questionsList = {};
var trivia = {};
var questions;
var answers = ["C", "A", "B", "A"];
var intervalId;

//timer
timer = {
    time: 30,
    start: function() {
        $("#timer-display").text("00:30");
        intervalId = setInterval(timer.countdown, 1000);
    },

    countdown: function() {
        timer.time--;
        $("#timer-display").text(timer.time);
        
        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalId);
            $(".done, .question-block").hide();
            score();
            $(".results, .reset").show();   
        }
        else {

        }
    },

    reset: function() {
        timer.time = 30;
        $("#timer-display").text("00:30");
        clearInterval(intervalId);
    },
    
};
//questions
function startTrivia() {
    questionsList = resetQuestions();
    trivia = resetTrivia();
    showQuestions();
}
function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}
function resetQuestions() {
    return {
        q0: {
            question: "What color is the sun?",
            A: "Green",
            B: "Blue",
            C: "Yellow",
        },
        q1: {
            question: "What color is grass?",
            A: "Green",
            B: "Pink",
            C: "Purple",
        },
        q2: {
            question: "What color is the ocean?",
            A: "Yellow",
            B: "Blue",
            C: "Orange",
        },
        q3: {
            question: "What color is on top of a stoplight?",
            A: "Red",
            B: "Magenta",
            C: "Teal",
        }
    }
}
function showQuestions() {
    questions = Object.keys(questionsList);
    for (var i = 0; i < questions.length; i++) {
        var questionsTitle = questions[i];
        var question = questionsList[questionsTitle];
        var questionBlocks = createQuestions(question, questionsTitle);
        $(".question-block").append(questionBlocks).show();
    }
}
function createQuestions(question,key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "'value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "'value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "'value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "'value='D'><label>" + question.D + "</label></li>" +
        "</ul>");
        return block;
}
function score() {
    var userAnswer = [
    $("input:radio[name='q0']:checked").val(),
    $("input:radio[name='q1']:checked").val(),
    $("input:radio[name='q2']:checked").val(),
    $("input:radio[name='q3']:checked").val()];
    console.log(userAnswer);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (userAnswer[k] === undefined) {
            trivia.blank++;
        }
        else if (userAnswer[k] === answers[k]) {
            trivia.correct++;
        }
        else {
            trivia.incorrect++;
        }
    }
    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);
    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}
$(document).ready(function () {
    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();
    });
    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });
    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});