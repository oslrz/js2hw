// import Сreature from "./Сreature";
// import Pokemon  from "./Pokemon";

const Type = {
  grass: "green",
  poison: "violet",
  fire: "red",
  electric: "yellow",
  dark: "black",
  dragon: "rgb(0, 255, 255)",
  fairy: "rgb(255, 0, 191)",
  fighting: "rgb(255, 128, 0)",
  flying: "rgb(113, 153, 182)",
  ghost: "rgb(191, 0, 255)",
  ground: "rgb(182, 150, 93)",
  ice: "rgb(0, 191, 255)",
  normal: "rgb(198, 120, 176)",
  psychic: "rgb(255, 0, 255)",
  rock: "rgb(206, 63, 55)",
  steel: "rgb(110, 136, 179)",
  water: "rgb(0, 128, 255)",
  bug: "rgb(0, 153, 51)",
};

class Сreature {
  constructor(name) {
    this.name = name;
  }
  getName = function () {
    return this.name;
  };
}
class Pokemon extends Сreature {
  constructor(name, info) {
    super(name);
    this.link = info;
  }
  getInfo = function () {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", this.link, true);
      request.responseType = "json";
      request.addEventListener("load", () => {
        resolve(request.response.abilities);
      });
      request.addEventListener("error", (err) => {
        reject(err);
      });
      request.send();
    });
  };
  getType = function () {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", this.link, true);
      request.responseType = "json";
      request.addEventListener("load", () => {
        resolve(request.response.types[0].type.name);
      });
      request.addEventListener("error", (err) => {
        reject(err);
      });
      request.send();
    });
  };
  getPhoto = function () {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", this.link, true);
      request.responseType = "json";
      request.addEventListener("load", () => {
        resolve(request.response.sprites.front_default);
      });
      request.addEventListener("error", (err) => {
        reject(err);
      });
      request.send();
    });
  };
}
async function CreateCard(obj) {
  let element = document.createElement("div");
  element.className = "card";
  element.style.width = "18rem";
  element.style.float = "left";
  element.style.margin = "1rem";
  let img = document.createElement("img");
  img.className = "card-img-top";
  img.src = await obj.getPhoto();
  let inner_div = document.createElement("div");
  inner_div.className = "card-body";
  let inner_p = document.createElement("p");
  inner_p.className = "card-text";
  inner_p.innerText = await obj.getName();
  element.appendChild(img);
  inner_div.appendChild(inner_p);
  element.appendChild(inner_div);
  return element;
}
console.log("valera");
let main = document.getElementById("main");
let Pokemons = new Array();
let request = new XMLHttpRequest();
request.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=24", true);
request.responseType = "json";
request.addEventListener("load", () => {
  let data = request.response;
  data.results.forEach((element) => {
    Pokemons.push(new Pokemon(element.name, element.url));
  });
  console.log(typeof Pokemons, Pokemons);
  Pokemons.map(async (pok) => {
    main.appendChild(await CreateCard(pok));
  });
});

request.send();
