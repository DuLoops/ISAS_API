function writeDB() {
  
  const xhttp = new XMLHttpRequest();
  const endPointRoot = "http://localhost:8888/";
  let name = document.getElementById("name").value;
  let score = document.getElementById("score").value;
  let params = "?name=" + name + "&score=" + score;
  xhttp.open("POST", endPointRoot, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhttp.send(params);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  }
  
  
}
