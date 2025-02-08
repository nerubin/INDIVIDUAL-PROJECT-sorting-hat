const students = [
  {
    id: 1,
    name: "Neville Longbottom",
    house: "Gryffindor"
  },
  {
    id: 2,
    name: "Michael Corner",
    house: "Ravenclaw"
  },
  {
    id: 3,
    name: "Leta Lestrange",
    house: "Slytherin"
  },
  {
    id: 4,
    name: "Hannah Abbott",
    house: "Hufflepuff"
  }
]
// houses
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
// expelled students
const heWhoShallNotBeNamed = [];

// Dom
const renderToDom = (divId, toRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = toRender;
  }
  // radomly places student in a house
  const randomHouse = () => {
    const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    const rando = Math.floor(Math.random() * houses.length);
    return houses[rando];
  };
  
  // Generate student cards with colors based on their house
  const studentsDom = (students) => {
    let domString = ""; // empty string to hold the HTML
    for (const student of students) { // Loop through each student object in the students array to determine their house color and create a card for them
      // Assign the class based on the students house
      let cardClass = ""; // start with an empty class
      // determine the class based on the student's house
      if (student.house === "Gryffindor") {
        cardClass = "gryffindor";
      } else if (student.house === "Slytherin") {
        cardClass = "slytherin";
      } else if (student.house === "Hufflepuff") {
        cardClass = "hufflepuff";
      } else if (student.house === "Ravenclaw") {
        cardClass = "ravenclaw";
      } 
      
      
      // add the student's card to the DOM string
      domString += `
        <div class="card ${cardClass}" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
            <div class="text-container">
              <p class="card-text">${student.house}</p>
              <div id="delete-btn">
                <button class="btn btn-danger mt-auto text-center" id="delete--${student.id}">
                  Expel
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    renderToDom("#app", domString); // render cards to the DOM
  };
  
const filter = (students, houseString) => {
const houseArray = []
for (const student of students) {
  if (student.house === houseString) {
    houseArray.push(student)
  }
}
return houseArray
}

// select btns for diff houses + sort btn
const allHousesButton = document.querySelector("#all-houses-btn")
const gryffindorButton = document.querySelector("#gryf-btn")
const hufflepuffButton = document.querySelector("#huffpuff-btn")
const ravenclawButton = document.querySelector("#ravenclaw-btn")
const slytherinButton = document.querySelector("#slytherin-btn")

// click event to filter students + houses + sort
allHousesButton.addEventListener("click", () => {
studentsDom(students)
})
gryffindorButton.addEventListener("click", () => {
const gryffindorHouse = filter(students, "Gryffindor")
studentsDom(gryffindorHouse)
})
hufflepuffButton.addEventListener("click", () => {
const hufflepuffHouse = filter (students, "Hufflepuff")
studentsDom(hufflepuffHouse)
})
ravenclawButton.addEventListener("click", () => {
const ravenclawHouse = filter (students, "Ravenclaw")
studentsDom(ravenclawHouse)
})
slytherinButton.addEventListener("click", () => {
const slytherinHouse = filter (students, "Slytherin")
studentsDom(slytherinHouse)
})

// FORM
const form = document.querySelector("form")
const createStudent = (e) => {
e.preventDefault();
const newStudent = {
  id: students.length + 1,
  name: document.querySelector("#name").value,
  house: randomHouse()
};
  students.push(newStudent)
  studentsDom(students)
  form.reset()
}
form.addEventListener("submit", createStudent)
const app = document.querySelector("#app")

// EXPEL -> deathEaterSquad
const heWhoShallNotBeNamedStudentsDom = (arr) => {
  let domString = ""
  for (const student of arr) {
    domString += ` 
      <div class="dark-card" style ="width: 18rem;">
        <div class="death-eater">
          <div class="death-welcome">
            <h4 div class="death-eater-welcome">The Dark Lord awaits your devotion!</h4>
          <h5 div class="death-eater-name">${student.name}</h5>
          <div class="death-body"> 
            <h5 p class="death-eater-text">${student.house}</h5>
          </div>
        </div>
    </div>
  `}
    renderToDom("#deathEaterSquad", domString)
  }
app.addEventListener("click", (e) => {
if (e.target.id.includes ("delete")) {
  const [, id] = e.target.id.split("--");
  const index = students.findIndex((e) => e.id === Number (id));
  const heWhoShallNotBeNamedStudent = students[index]
  students.splice(index, 1)
  heWhoShallNotBeNamed.push(heWhoShallNotBeNamedStudent)
  studentsDom(students)
  heWhoShallNotBeNamedStudentsDom(heWhoShallNotBeNamed)
}
});
const startApp = () => {
studentsDom(students);
}
startApp();
