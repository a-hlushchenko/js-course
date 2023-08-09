const Animal = {
  name: "Тварина",
  voice: "Звук",

  say() {
    console.log(`${this.name} каже ${this.voice}`);
  },
};

const dog = Object.create(Animal);
dog.name = "Собака";
dog.voice = "Гав";

Object.defineProperty(dog, "_space", {
  value: 5,
  writable: true,
  configurable: true,
});

Object.defineProperty(dog, "space", {
  set(value) {
    this._age = value * 4;
  },

  get(value) {
    return `${this._space}px`;
  },
});

Animal.go = function () {
  console.log(`${this.name} біжить`);
};

const Tag = {
  render(value) {
    return `<>${value}</>`;
  },
  className: null,
};

const Button = Object.create(Tag);

Button.render = function (value = "") {
  return `<button style="${this.style}">${value}</button>`;
};

const mainButton = Object.create(Button, {
  style: {
    value: "background-color: #777",
    writable: true,
  },
  className: { value: "btn" },
});

const Input = Object.create(Tag);

Input.render = function () {
  return `<input placeholder="${this.placeholder}" style="${this.style}">`;
};

const loginInput = Object.create(Input, {
  style: {
    value: "border: 1px solid black",
    writable: true,
  },
  placeholder: {
    value: "Login",
  },
});
