
let email = document.getElementById("email")
let password = document.getElementById("password")

const onlogin = async ()=>{
    let obj = {
    
        email : email.value,
        password : password.value,
     
    }

    console.log(obj)
    
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
      console.log('res',res)
    //   alert("SignUp Successfull")
      window.location.href="../homepage/index.html"
  
  } catch (error) {
    console.log(error.message)
  }
}