import $ from "jquery";
import "./index.css";
import copyIcon from "./icons8-copy-50.png";
import { type, stopTyping } from "./canvasText";
("use strict");

$("#copy img").attr("src", copyIcon);

const projectsButton = $("header > button:nth-child(1)");
const contactButton = $("header > button:nth-child(2)");
const aboutButton = $("header > button:nth-child(3)");
const projects = $("body > div:nth-of-type(1)");
const contact = $("body > div:nth-of-type(2)");
const about = $("body > div:nth-of-type(3)");

projectsButton.click(() => headerClick(projects));
contactButton.click(() => headerClick(contact));
aboutButton.click(() => headerClick(about));

const copied = $("li span");

$("#copy").click(() => {
  navigator.clipboard.writeText("benjamin.kalish@gmail.com");
  copied.show();
});

async function headerClick(element) {
  await slidUp(projects);
  await slidUp(contact);
  await slidUp(about);
  copied.hide();
  stopTyping();
  $("#manicule").remove();
  element.slideDown();
}

function slidUp($element) {
  return new Promise((resolve) => {
    $element.slideUp({
      complete: resolve,
    });
  });
}

type();
