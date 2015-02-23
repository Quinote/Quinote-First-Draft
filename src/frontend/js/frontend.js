
$('#b').click(function(){
  $('#quizframe').toggle();
  $('#scorepage').toggle();
});
$('#b1').click(function(){
  $('#quizframe').toggle();
});
$(".numberonly").on("keypress keyup blur",function (event) {
  $(this).val($(this).val().replace(/[^\d].+/, ""));
  if ((event.which < 48 || event.which > 57)) {
    event.preventDefault();
  }
});
function showQuiz(){
  document.getElementById("quizopener").style.visibility="hidden";
  document.getElementById("quizframe").style.visibility="visable";
  document.getElementById("scorepage").style.visibility="hidden";
  document.getElementById("one").style.display="none";
  document.getElementById("two").style.display="none";
  document.getElementById("b2").style.display="none";
}
var q=0;
var score=0;
var rand = [];
var counter=0;
var we = document.getElementById("qLength").value;
var nuw = parseInt(we);

function checkAnswer() {
  document.getElementById("checkCon").style.visibility="visable";
  document.getElementById("meow").style.visibility="hidden";
  var inputs = document.getElementsByName("rd");
  var chat = document.getElementsByName("ch");
  var x=0;
  var y=0;
  if  (testQuestions[q].questionType == 1){
    for (var i = 0; i < inputs.length; i++){
      if (inputs[i].checked){
        y=1;
        if(testQuestions[q].choices[i]==testQuestions[q].answer){
          score = score + 1;
          document.getElementById("scr").value = score;
          showCorrect();
        }
        else if(testQuestions[q].choices[i]!=testQuestions[q].answer){
          showIncorrect()
        }
        inputs[i].checked = false;
      }
    }
    if(!y){
      alert("Please select an answer");
    }
    else
    {
      checkPage();
    }
  }
  else if(testQuestions[q].questionType==2){
    var getAnsText = document.getElementById("ansText").value;
    ansLower = getAnsText.toLowerCase();
    if (getAnsText==""){
      x=1;
    }
    else if( ansLower == testQuestions[q].answer){
      score = score + 1;
      document.getElementById("scr").value = score;
      showCorrect();
    }
    else if( ansLower != testQuestions[q].answer){
      showIncorrect();
    }
    document.getElementById("ansText").value="";
    if(x){
      alert("Please answer");
    }
    else{
      checkPage();
    }
  }
  else if(testQuestions[q].questionType==3){
    for (var i = 0; i < chat.length; i++){
      if (chat[i].checked){
        y=1;
        if(testQuestions[q].select[i]==testQuestions[q].answer){
          score = score + 1;
          document.getElementById("scr").value = score;
          showCorrect();
        }
        else if(testQuestions[q].select[i]!=testQuestions[q].answer){
          showIncorrect()
        }
        chat[i].checked = false;
      }
    }
    if(!y){
      alert("Please choose true or false");
    }
    else{
      checkPage();
    }
  }
}
function showCorrect(){
  document.getElementById("one").style.display="";
  $('#one').toggle;
  var oneAns=document.getElementById("one");
  var aText=" is correct!";
  oneAns.innerHTML= testQuestions[q].answer + aText;
  document.getElementById("b2").style.display="";

}
function hideCorrect(){
  document.getElementById("one").style.display="none";

}
function showIncorrect(){
  document.getElementById("two").style.display="";
  $('#two').toggle;
  var twoAns=document.getElementById("two");
  var a2Text="Incorrect! The answer is: ";
  twoAns.innerHTML= a2Text + testQuestions[q].answer;
  document.getElementById("b2").style.display="";
}
function hideIncorrect(){
  document.getElementById("two").style.display="none";
}
function generateRandomNum(){
  q= Math.floor((Math.random() *testQuestions.length));
  for (i=0;i<11;i++){
    if (q == rand[i]){
      generateRandomNum();
    }
  }
  rand.push(q);
}
function checkPage(){
  document.getElementById("checker").style.display="none";
  document.getElementById("b2").style.display="";
}
function randomizeQuiz(){
  document.getElementById("meow").style.visibility="";
  var we = document.getElementById("qLength").value;
  var nuw = (parseInt(we) + 1);
  document.getElementById("checker").style.display="";
  document.getElementById("b2").style.display="none";
  hideIncorrect();
  hideCorrect();
  counter++;
  if(counter==nuw){
    completeQuiz();
  }
  else{
    generateRandomNum();
    if (testQuestions[q].questionType == 1){
      var x=document.getElementById("question");
      var mcq=" is: ";
      x.innerHTML= testQuestions[q].identifier + mcq;
      hideText();
      showRadioChoice();
      showRadiobuttons();
      hideCheck();
      $("#answer_choice").insertAfter("#formAction");
    }
    else if(testQuestions[q].questionType==2){
      var x=document.getElementById("question");
      var fbq=" ___________ ";
      x.innerHTML=testQuestions[q].identifier + fbq + testQuestions[q].end[0];
      hideChoice();
      showText();
      hideCheck();
      $("#answer_text").insertAfter("#formAction");
    }
    else if(testQuestions[q].questionType==3){
      var x=document.getElementById("question");
      var tfq=" is associated with ";
      x.innerHTML=testQuestions[q].identifier + tfq + testQuestions[q].definition[0];
      hideChoice();
      hideText();
      showCheckbuttons();
      showCheck();
      $("#answer_check").insertAfter("#formAction");
    }
  }
}
function showRadiobuttons(){
  document.getElementById("rad1").innerHTML = testQuestions[q].choices[0];
  document.getElementById("rad2").innerHTML = testQuestions[q].choices[1];
  document.getElementById("rad3").innerHTML = testQuestions[q].choices[2];
  document.getElementById("rad4").innerHTML = testQuestions[q].choices[3];
  document.getElementById("rad1").value = testQuestions[q].choices[0];
  document.getElementById("rad2").value = testQuestions[q].choices[1];
  document.getElementById("rad3").value = testQuestions[q].choices[2];
  document.getElementById("rad4").value = testQuestions[q].choices[3];
  return;
}
function showRadioChoice(){
  document.getElementById("answer_choice").style.display="";
}
function hideChoice(){
  document.getElementById("answer_choice").style.display="none";
}
function showCheckbuttons(){
  document.getElementById("true").innerHTML = testQuestions[q].select[0];
  document.getElementById("false").innerHT = testQuestions[q].select[1];
  document.getElementById("true").value = testQuestions[q].select[0];
  document.getElementById("false").value = testQuestions[q].select[1];
  return;
}
function showCheck(){
  document.getElementById("answer_check").style.display="";
}
function hideCheck(){
  document.getElementById("answer_check").style.display="none";
}
function showText(){
  document.getElementById("answer_text").style.display="";
}
function hideText(){
  document.getElementById("answer_text").style.display="none";
}
function completeQuiz(){
  var score_exit;
  document.getElementById("scr").value = score_exit;
  var om = document.getElementById("qLength").value;
  var tot = (parseInt(om));
  $("#question").html("<h4>Your score is: "+score+"/"+tot+"<h4>");
  document.getElementById("answer_text").style.display="none";
  document.getElementById("answer_choice").style.display="none";
  document.getElementById("answer_check").style.display="none";
  document.getElementById("scorepage").style.display="";
  document.getElementById("b1").style.display="none";
  document.getElementById("b2").style.display="none";
  document.getElementById("checker").style.display="none";
};
var dialog = (function() {
  function init() {
    var overlay = document.querySelector( '.dialogShadow' );
    [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {
      var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
          close = modal.querySelector( '.md-close' );
      function removeModal() {
        classie.remove( modal, 'md-show' );
      }
      function removeModalHandler() {
        removeModal();
      }
      el.addEventListener( 'click', function( ev ) {
        classie.add( modal, 'md-show' );
      });
      close.addEventListener( 'click', function( ev ) {
        removeModalHandler();
      });
    });
  }
  init();
})();
$(function() {
  $( "#editor-wrapper" ).draggable({
    handle: "#editorToolbar",
    containment: "parent"
  });
  $( "#sidebar" ).draggable({ containment: "parent" });
});