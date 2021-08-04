var username='admin'
var password='admin'
var checkUsername, checkPassword
var signUp=document.getElementById("signUp")
var loginState=0

function verify(){
    checkUsername=document.getElementById("username").value
    checkPassword=document.getElementById("password").value
}
function check(){
    if(checkUsername!=username && checkPassword!=password){
        alert("Username invalid")
    }
    else if(checkUsername==username && checkPassword!=password){
        alert("Wrong password")

    }
    else if(checkUsername!=username && checkPassword==password){
        alert("Username and password invalid")
    }
    else if(checkUsername==username && checkPassword==password)
    {
        alert("login successful, you are redirected to the page")
        loginState=1
        window.location = "source/index.html"
    }
}
function login(){
    console.log(username,password)
    verify()
    console.log(username,password)
    check()
}