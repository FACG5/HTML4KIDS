var currentFocus;
var inp = document.getElementById("myInput");

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
            inp.value = b.getElementsByTagName("input")[0].value;
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
