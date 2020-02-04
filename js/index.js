document.addEventListener('DOMContentLoaded', function(){
  fetchMonsters()
  createMonsterForm()
  createNewMonster()
  
  console.log("The DOM is loaded")
});
// end DOM Listener

function createNewMonster() {
  // Where will we put new monster info:
  const createMonsterForm = document.querySelector('#create-monster-form');
  // put event listener on create monster FORM
  createMonsterForm.addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const age = document.getElementById('age-input').value;
    const description = document.getElementById('description-input').value;

  //construct the data in the form it is in the database
    const data = {
      name: name,
      age: age,
      description: description
    }
    fetch("http://localhost:3000/monsters",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
   .then(resp => resp.json())
   .then(newMonster => {
     const monsterContainer = document.querySelector("#monster-container")
     const newMonsterDiv = renderSingleMonster(newMonster)
     debugger
     monsterContainer.innerHTML += newMonsterDiv 
     
     
   })
  });
}
    
  
  
  //send entered info to backend.

  

 function renderSingleMonster(monster) {
  
  return `<div data-id="${monster.id}">
        <p class="monster-name">${monster.name}</p>
        <p class="monster-age">${Math.round(monster.age)}</p>
        <p class="monster-description">${monster.description}</p>
      <div></div>
         `;
 }




function createMonsterForm() {
  const createMonsterDiv = document.querySelector('#create-monster')
  const createMonsterHTML = `
         <form id="create-monster-form">
           <h2>Add a Monstr!</h2>
           Monster name:<br>
           <input type="text" id="name-input" name="name">
           <br><br>
           Monster age:<br>
           <input type="text" id="age-input" name="age">
           <br><br>
           Monster description:<br>
           <input type="text" id="description-input" name="description">
           <input id="submit" class="monster-button" type="submit">
         </form>
         <br><br>
  `

  createMonsterDiv.innerHTML += createMonsterHTML;
}

function renderFiftyMonsters(fiftyMonsters) {
  const monsterContainer = document.querySelector('#monster-container')
  fiftyMonsters.forEach(monster => {
    //monster's name, age, and description should be shown.
    monsterContainer.innerHTML += `
      <div data-id="${monster.id}">
        <p class="monster-name">${monster.name}</p>
        <p class="monster-age">${Math.round(monster.age)}</p>
        <p class="monster-description">${monster.description}</p>
      <div>
    `
  })
}

function fetchMonsters() {
  fetch("http://localhost:3000/monsters?_limit=5")
  .then(resp => resp.json())
  .then(data => renderFiftyMonsters(data))
  // .then(monsters => {
  //   fiftyMonsters = monsters.slice(0, 50);
  //   return renderFiftyMonsters(fiftyMonsters)
  // })
}