// const axios = require("axios")

// const formEl = document.querySelector("form")
// console.log(formEl)

// catching form elements

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPass = document.getElementById("confirm-password");

// const url = "http://localhost:5501"

// formEl.addEventListener("click",async(e)=>{
//     e.preventDefault();

//     // console.log(obj)
//     // let response = axios.post(`${url}/register`,obj)
//     // console.log(response)

//     let response =await fetch(`${url}/register`,{
//         method : "POST",
//         headers : {
//             "Content-Type" : "appllication/json"
//         },
//         body : JSON.stringify(obj)
//     })

//     console.log(response.json())
// })

const onsignup = async () => {
  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPass: confirmPass.value,
  };

  console.log(obj);

  try {
    let url = "http://localhost:5501/user/register";

    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await responce.json();
    console.log("res", res);
    //   alert("SignUp Successfull")
    window.location.href = "./login.html";
  } catch (error) {
    console.log(error.message);
  }
};
