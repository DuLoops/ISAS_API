const endPointRoot = "https://API.baumanntennis.com";
const GET = "GET";
const POST = "POST";

const getAll = () => {
  const xhttp = new XMLHttpRequest();
  let resource = "/admin";
  const url = endPointRoot + resource;
  xhttp.open(GET, url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.response);
          let endpoints = JSON.parse(this.response);
          endpoints.forEach(element => {
              let child = document.createElement("p");
              child.innerHTML = element.name + ": " + element.hits;
              document.getElementById("Stats").appendChild(child);
          });
      };
  };
}

const login = () => {
  const xhttp = new XMLHttpRequest();
  let resource = "/adminlogin";
  const url = endPointRoot + resource;

  let LoginInfo = {
    username: document.querySelector("#LoginForm").Username.value,
    password: document.querySelector("#LoginForm").Password.value
  }

  xhttp.open(POST, url, true);
  xhttp.send(LoginInfo);
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          if (JSON.parse(this.response).success) {
            document.getElementById("LoginWidget").style.display = "none";
            document.getElementById("Stats").style.display = "block";
          } else {
            alert("Login unsuccessful, please try again");
          }
      };
  };
}

const refresh = () => {
  document.getElementById("Stats").innerHTML = "";
  getAll();
}
