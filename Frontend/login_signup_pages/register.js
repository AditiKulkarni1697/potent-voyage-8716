let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");

const onsignup = async () => {
  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "https://time-trace-backend.onrender.com/user/register";
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
