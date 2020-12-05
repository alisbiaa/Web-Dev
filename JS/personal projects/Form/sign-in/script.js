
function checkPassword(){

    // between 6 to 20 characters which contain at least one numeric
    // digit, one uppercase and one lowercase letter
    var passw =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var empty = '' ;

    var myInput= document.getElementById("password");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");


    // When the user clicks on the password field, show the message box
    myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {

        if (!(myInput.value === empty) && !(myInput.value.match(passw)))
            myInput.style.borderColor =  'red' ;
        else
            myInput.style.borderColor ='#d1d5f5' ;

        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if(myInput.value.length >= 6) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }



    }

    return myInput.value.match(passw) ;

}

function checkName() {
    var name  = /^[A-Za-z].{2,15}$/ ;
    var input = document.getElementById('name') ;

    if (! input.value.match(name))
        input.style.borderColor = 'red' ;

    else
        input.style.borderColor = '#d1d5f5' ;

    input.onblur = function (){
        if (input.value === '')
            input.style.borderColor = '#d1d5f5' ;

    }
}

function checkPhone(){

}

function checkEmail(){
    var regex = / ^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$ /
    var input = document.getElementById('email') ;

    if (! input.value.match(regex))
        input.style.borderColor = 'red' ;

    else
        input.style.borderColor = '#d1d5f5' ;

    input.onblur = function (){
        if (input.value === '')
            input.style.borderColor = '#d1d5f5' ;
    }
}



