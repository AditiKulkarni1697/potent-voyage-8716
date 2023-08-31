let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
// let confirmPass = document.getElementById("confirm-password");
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
  if (firstName.value.trim() === "") {
    alert("Please enter your first name.");
    return;
  }

  if (lastName.value.trim() === "") {
    alert("Please enter your last name.");
    return;
  }

  if (email.value.trim() === "") {
    alert("Please enter your email.");
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.value.trim() === "") {
    alert("Please enter your password.");
    return;
  }

  // Validate password length, uppercase letter, and special character
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (!/[A-Z]/.test(password.value)) {
    alert("Password must contain at least one uppercase letter.");
    return;
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password.value)) {
    alert("Password must contain at least one special character.");
    return;
  }

  console.log(obj);

  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "http://localhost:3300/user/register";
    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await responce.json();
    console.log("res", res);
    alert("SignUp Successfull");
    window.location.href = "./login.html";
  } catch (error) {
    console.log(error.message);
  }
};
