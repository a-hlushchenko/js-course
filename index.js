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

class User {
  constructor(email) {
    this.email = email;
  }

  sendEmail(message) {
    console.log(`Відправка повідомлення '${message}' на email ${this.email}`);
  }
}

class Video {
  constructor(name) {
    this.name = name;
  }
}

class Channel {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  unsubscribe(user) {
    this.subscribers = this.subscribers.filter((sub) => sub !== user);
  }

  createVideo(name) {
    const video = new Video(name);
    this.sendNotify(video);
  }

  sendNotify(video) {
    this.subscribers.forEach((subscriber) => {
      subscriber.sendEmail(`Нове відео "${video.name}" на каналі "${this.name}"`)
    })
  }
}

const channel = new Channel('zizizone');

const user1 = new User('qwerty@gmai.com');
const user2 = new User('asd@gmai.com');
const user3 = new User('danya@gmai.com');

channel.subscribe(user1);
channel.subscribe(user2);
channel.subscribe(user3);

channel.createVideo('lesson');

channel.unsubscribe(user1);

console.log('==============');

channel.createVideo('vidddeooo');
*/

class Coffee {
  name = 'coffee';
  cost = 10;

    cook() {
      console.log(`готується ${this.name}`)
    }
}

class MilkDecorator {
  constructor(coffee, amount) {
    this.coffee = coffee;
    this.amount = amount;
  }

  get name() {
    return `${this.coffee.name} з ${this.amount}мл молока`;
  }

  get cost() {
    const milkPrice = 0.05;
    return this.coffee.cost + milkPrice * this.amount;
  }

  cook() {
    console.log(`готується ${this.name}`)
  }
}

let coffee = new Coffee();
console.log(coffee.name);
console.log(coffee.cost);
coffee.cook();

let latteCoffee = new MilkDecorator(coffee, 10);
console.log(latteCoffee.name);
console.log(latteCoffee.cost);
latteCoffee.cook();