let spin_btn = document.querySelector(".spin-btn");
let container = document.querySelector(".container");
let rotation = 0;
let choice_input = document.querySelector(".choice-input");
let add_choices_btn = document.querySelector(".add-choices-btn");
let wrong_format_err = document.querySelector(".wrong-format-err");
let range_err = document.querySelector(".range-err");
let color_palette = ["#93e4c1", "#3baea0", "#118a7e", "#1f6f78"];
let num_choices = 3;
let result = document.querySelector(".result");
let name_inputs = document.querySelectorAll(".choice-name");
let choices = document.querySelectorAll(".choice");
let finished_spinning = true;

function handleNamingInputs() {
  for (let i = 0; i < name_inputs.length; i++) {
    name_inputs[i].addEventListener("input", function() {
      choices[i].textContent = name_inputs[i].value;
    });
  }
}

handleNamingInputs();

spin_btn.addEventListener("click", function() {
  // Generates random integer between 2160 and 3239 inclusive
  if (finished_spinning) {
    finished_spinning = false;
    rotation += Math.ceil((Math.random() * 1080) + 2160);
    console.log("rotation by " + rotation);
    container.style.transform = "rotate(" + rotation + "deg)";
  }
});

container.addEventListener("transitionend", function() {
  let section = 360 / num_choices;
  let angle = (rotation - (section / 2)) % 360;
  let choice_number = 0
  console.log("angle: "  + angle + " section: " + section);
  if (angle != 0) {
    choice_number = Math.floor((360 - angle) / section);
  }
  console.log("choice number: " + choice_number);
  choices = document.querySelectorAll(".choice");
  result.textContent = "\"" + choices[choice_number].textContent + "\"" + " was chosen";
  result.style.opacity = "100%";
  console.log(choices[choice_number].textContent + " was chosen");
  finished_spinning = true;
})

add_choices_btn.addEventListener("click", function() {
  const temp = num_choices;
  num_choices = choice_input.value;
  if (parseInt(num_choices) == num_choices) {
    console.log(num_choices);
    if (num_choices < 2 || num_choices > 30) {
      range_err.style.opacity = "100%";
      num_choices = temp;
    }
    else {
      let choice = document.querySelector(".choice");
      let name_input = document.querySelector(".choice-name");
      while (choice != null) {
        // remove choices
        choice.remove();
        choice = document.querySelector(".choice");

        // remove inputs
        name_input.remove();
        name_input = document.querySelector(".choice-name");
      }
      let curr_rotation = 0;
      let angle_degrees = 180 / num_choices;
      let angle_radians = angle_degrees * (Math.PI / 180);
      for (let i = 0; i < num_choices; i++) {
        // add new choice
        console.log("Adding " + (i + 1) + "-th choice");
        let new_choice = document.createElement("div");
        new_choice.textContent = "Choice " + (i + 1);
        new_choice.classList.add("choice");
        if (num_choices == 2) {
          new_choice.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
          new_choice.aspectRatio = 2 / 1;
          new_choice.style.transform = "translateX(-50%) rotate(" + (180 * i) + "deg)";
        }
        else {
          new_choice.style.aspectRatio = (2 * Math.tan(angle_radians)) + " / 1";
          new_choice.style.transform = "translateX(-50%) rotate(" + curr_rotation + "rad)";
          curr_rotation += (angle_radians * 2);
        }
        new_choice.style.backgroundColor = color_palette[i % color_palette.length];
        if ((num_choices % 4 == 1) && (i == num_choices - 1)) {
          new_choice.style.backgroundColor = color_palette[1];
        }
        container.appendChild(new_choice);
        
        // add new naming input
        let new_input = document.createElement("input");
        new_input.placeholder = "Name of Section " + (i + 1);
        new_input.classList.add("choice-name");
        (document.querySelector(".left-card")).appendChild(new_input);
      }
      name_inputs = document.querySelectorAll(".choice-name");
      choices = document.querySelectorAll(".choice");
      handleNamingInputs();
    }
  }
  else {
    wrong_format_err.style.opacity = "100%";
  }
});

choice_input.addEventListener("input", function() {
  wrong_format_err.style.opacity = "0%";
  range_err.style.opacity = "0%";
});