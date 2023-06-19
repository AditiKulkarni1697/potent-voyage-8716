let email = document.getElementById("email");
let password = document.getElementById("password");
const onlogin = async () => {
  let obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "http://localhost:9090/user/login";
    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await responce.json();
    console.log("res", res);
    alert("Login Successfull");
    window.location.href =
      "http://127.0.0.1:5501/Frontend/project_timer_pages/project.html";
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log(error.message);
  }
};
