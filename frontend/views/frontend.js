'use strict';

var items = [1, 2, 3];
var target = document.querySelector(".bi.bj .bi.bj");
var template = "<div><label class=\"bo bp\"><input type=\"checkbox\" name=\"addees[~id~]\" value=\"~id~\">Test ~id~</label></div>";

items.forEach(function(item) {
    target.insertAdjacentHTML("beforeend", template.replace(/~id~/g, item));
});