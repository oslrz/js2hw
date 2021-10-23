import Сreature from "./Сreature"
export default class Pokemon extends Сreature {
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
    getType = function() {
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
    }
  }