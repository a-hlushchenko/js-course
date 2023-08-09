/*
class RecentPurchases {
	static #instance = null;

	static purchases = [];

	static create() {
		if(!this.#instance) {
			this.#instance = new RecentPurchases();
		}

		return this.#instance;
	}

	static add(item) {
		this.purchases.push(item);
	}

	static get() {
		return this.purchases;
	}
}

RecentPurchases.create();

RecentPurchases.add('phone');
RecentPurchases.add('airpods');

console.log(RecentPurchases.get());
*/

class Button {
  constructor(text, color) {
    this.text = text;
    this.color = color;
  }

  render() {
    return `<button class="color-${this.color}">${this.text}</button>`;
  }
}

class IconButton {
  constructor({ icon, color }) {
    this.icon = icon;
    this.color = color;
  }

  render() {
    return `<button class="color-${this.color}"><img src="${this.icon}"/></button>`;
  }
}

class ButtonFactory {
  static TYPE = {
    BASIC: "basic",
    ICON: "icon",
  };

  static createButton(type, options) {
    switch (type) {
      case this.TYPE.BASIC:
        return new Button(options);
      case this.TYPE.ICON:
        return new IconButton(options);
      default:
        throw new Error(`Кнопка типу ${type} не існує`);
    }
  }
}

const myIconButton = ButtonFactory.createButton(ButtonFactory.TYPE.ICON, {
  color: "red",
  icon: "/icon/myicon.svg",
});

console.log(myIconButton);
