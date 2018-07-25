var currentFocus;
var inp = document.getElementById("myInput");
var infodiv = document.getElementById("infodiv");
inp.addEventListener("input", function(e) {
  var val = inp.value;

  connect(
    val,
    "POST",
    "/api/suggestions",
    function(arr) {
      var a,
        b,
        i,
        val = inp.value;
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", inp.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      inp.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

          b.addEventListener("click", function(e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            /////to be added here
            connect(inp.value,'POST','/api/info',function(response){

              infodiv.innerHTML = "";
              var definition_title = document.createElement('h2');
              var usage_title = document.createElement('h2');
              var url_title = document.createElement('h2');
              var example_title = document.createElement('h2');

              definition_title.textContent = 'Definition'
              usage_title.textContent = 'Usage'
              url_title.textContent = 'URL'
              example_title.textContent = 'Example'

              var definition = document.createElement('p');
              var usage = document.createElement('p');
              var url = document.createElement('p');
              var example = document.createElement('p');

              definition.textContent = response.definition;
              usage.textContent = response.usage;
              url.textContent = response.url;
              example.textContent = response.example;

              infodiv.appendChild(definition_title);
              infodiv.appendChild(definition);

              infodiv.appendChild(usage_title);
              infodiv.appendChild(usage);

              infodiv.appendChild(url_title);
              infodiv.appendChild(url);
              
              infodiv.appendChild(example_title);
              infodiv.appendChild(example);

            });
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    }
  );
});
/*execute a function presses a key on the keyboard:*/
inp.addEventListener("keydown", function(e) {
  var x = document.getElementById(inp.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
    //up
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (x) x[currentFocus].click();
    }
  }
});
function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function(e) {
  closeAllLists(e.target);
});
//
//
// var words = ["select","details","dialog","menu","menuitem","summary","content","element","shadow","template","acronym","applet","basefont","big","blink","center","dir","frame","frameset","isindex","listing","noembed","plaintext","spacer","strike","tt","xmp"];
// autocomplete(document.getElementById("myInput"), words);
