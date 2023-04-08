let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
// , "dagger", "sword"
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterNameText = document.querySelector("#monsterName");

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    // I think the below term "name" is just for the understanding of the coder that these statements are for which place.
    name: "town square",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store."',
  },
  {
    name: "Store",
    "button text": [
      "Buy 10 Health (10 Gold)",
      "Buy Weapon (30 Gold)",
      "Go to Town Square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store",
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "Fight Slanged Beast", "Go to Town Square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and final gold ',
  },
  {
    name: "lose",
    "button text": ["REPLAY ?", "REPLAY ?", "REPLAY ?"],
    "button functions": [restart, restart, restart],
    text: 'You Die.',
  },
  {
    name: "win",
    "button text": ["REPLAY ?", "REPLAY ?", "REPLAY ?"],
    "button functions": [restart, restart, restart],
    text: 'You defeat the dragon! YOU WIN THE GAME!',
  }
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Consider 'update(location)' whole as the name of function and the terms such as 'button1.innerText = location["button text"][0];' think location as ki kaha hai iski value. and 'location[]' is for ki is location se is '[]' value ko leke aao

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

// We are giving location of locations array

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough Gold to buy Health";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText = "In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough Gold to buy weapon";
    }
  } else {
    text.innerText = "You have the most powerful weapon!";
    button2.innerText = "Sell Weapon";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold = gold + 15;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + "attack.";
  text.innerText +=
    "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
}

function dodge() {
  text.innerText =
    "You dodge the attack from the  " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}
function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health= 100;
  gold = 50;
  currentWeapon = 0;
  inventory = "stick";
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
