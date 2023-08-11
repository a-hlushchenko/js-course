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

class TextEditor {
  #text = "";

  set text(text) {
    this.#text = text;
    this.#save();
  }

  get text() {
    return this.#text;
  }

  #save() {
    Snapshot.create(this.text);
  }

  restore() {
    this.#text = Snapshot.restore().text;
  }
}

class Snapshot {
  constructor(text) {
    this.text = text;
  }

  static #snapshots = [];

  static create(text) {
    this.#snapshots.push(new Snapshot(text));
  }

  static restore() {
    this.#snapshots.pop();
    return this.#snapshots[this.#snapshots.length - 1];
  }
}

const editor = new TextEditor();

editor.text = "Hello!";
editor.text = "Hello world";
editor.text = "Hello worlds!!!";

console.log(editor.text);

editor.restore();

console.log(editor.text);

editor.restore();

console.log(editor.text);

class AuthHandler {
  setNextHandler(handler) {
    this.nextHandler = handler;
    return handler;
  }

  login(user, password) {
    if (this.nextHandler) {
      return this.nextHandler.login(user, password);
    } else {
      return false;
    }
  }
}

class TwoFactorAuthHandler extends AuthHandler {
  login(user, password) {
    if (
      user === "john" &&
      password === "password" &&
      this.isValidTwoFactorCode()
    ) {
      console.log("вхід за допомогою двохфакторної аутентифікації дозволено");
      return true;
    } else {
      return super.login(user, password);
    }
  }

  isValidTwoFactorCode() {
    return true;
  }
}

class RoleHandler extends AuthHandler {
  login(user, password) {
    if (user === "guest") {
      console.log("вхід дозволено з роллю гостя");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

class CredentialHandler extends AuthHandler {
  login(user, password) {
    if (user === "admin" && password === "admin123") {
      console.log("вхід дозволено за логіном та паролем");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

class HandlerBuilder {
  constructor() {
    this.firstHandler = null;
    this.lastHandler = null;
  }

  add(handler) {
    if(!this.firstHandler) {
      this.firstHandler = handler;
      this.lastHandler = handler;
    } else {
      this.lastHandler.setNextHandler(handler);
      this.lastHandler = handler;
    }

    return this;
  }

  create() {
    return this.firstHandler;
  }
}

const handlerBuilder = new HandlerBuilder();

const handler = handlerBuilder.add(new CredentialHandler()).add(new TwoFactorAuthHandler()).add(new RoleHandler()).create();

if (!handler.login('guest', 'admin123')) {
  console.log(`вхід заборонено`);
} 

class User {
    constructor(name, messanger) {
      this.name = name;
      this.messanger = messanger;
    }
  
    sendMessage(message) {
      const formattedMessage = this.formatMessage(message);
      this.messanger.sendMessage(formattedMessage);
    }
    formatMessage(message) {
      return `[${this.name}]: ${message}`;
    }
  }
  
  class SMSMessanger {
     static sendMessage(message) {
      console.log((`Відправлено SMS: ${message}`))
     }
  }
  
  class EmailMessanger {
     static sendMessage(message) {
      console.log((`Відправлено email: ${message}`))
     }
  }
  
  const user1 = new User('Anton', SMSMessanger);
  const user2 = new User('Anton', EmailMessanger);
  user1.sendMessage('Ваш акаунт успішно зареєстровано');
  user2.sendMessage('Ваш акаунт успішно зареєстровано');

class Composite {
  comments = [];

  addComment(comment) {
    this.comments.push(comment);
  }

  removeComment(comment) {
    const index = this.comments.indexOf(comment);

    if (index >= 0) {
      this.comments.splice(index, 1);
    }
  }
}

class Comment extends Composite {
  constructor(text) {
    super();
    this.text = text;
  }

  display() {
    console.log(`- Коментар: ${this.text}`);

    for (const comment of this.comments) {
      comment.display();
    }
  }
}

class Video extends Composite {
  constructor(title) {
    super();
    this.title = title;
  }

  display() {
    console.log(`Відео ${this.title}`);

    for (const comment of this.comments) {
      comment.display();
    }
  }
}

const video = new Video("Навчальне відео");

video.addComment(new Comment("Дуже корисне відео"));
video.addComment(new Comment("qwerty"));
video.addComment(new Comment("top"));

video.comments[0].addComment(new Comment(`Відповідь: згоден`));

video.display();

class Category {
  static #categories = {};

  constructor(name) {
    this.name = name;
  }

  static create(name) {
    if (!this.#categories[name]) {
      this.#categories[name] = new Category(name);
    }

    return this.#categories[name];
  }
}

class Product {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }

  display() {
    console.log(`Product: ${this.name}, category: ${this.category.name}`);
  }
}

const electronics = Category.create("Electronics");
const book = Category.create("Book");
const electronics2 = Category.create("Electronics");

const product1 = new Product("iphone", electronics);
const product2 = new Product("airpods", electronics);
const product3 = new Product("book", book);
const product4 = new Product("macbook", electronics2);

product1.display();
product2.display();
product3.display();
product4.display();

const list = [product1, product2, product3, product4].filter(
  (product) => product.category === electronics
);

console.log(list);

class CoffeeMachine {
  prepareCoffee() {
    this.boilWater();
    this.grindCoffeeBeans();
    this.brewCoffee();
    this.poorIntoCup();
    this.addIngredients();
    this.serveCoffee();
  }

  boilWater() {
    console.log(``);
  }

  grindCoffeeBeans() {
    console.log(`Boiling water...`);
  }

  brewCoffee() {
    console.log(`Grinding coffe beans...`);
  }

  poorIntoCup() {
    console.log(`pooring into cup...`);
  }

  addIngredients() {}

  serveCoffee() {
    console.log(`Servering coffee...`);
  }
}

class LatteCoffee extends CoffeeMachine {
  addIngredients() {
    console.log(`adding milk...`);
  }
}

class CappuccinoCoffee extends CoffeeMachine {
  addIngredients() {
    console.log(`adding milk and cocoa...`);
  }
}

const latteCoffe = new LatteCoffee();
latteCoffe.prepareCoffee();

const cappuccinoCoffe = new CappuccinoCoffee();
latteCcappuccinoCoffeoffe.prepareCoffee();

class TextFile {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

class ImageFile {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class VideoFile {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

class TextEditor {
  files = [];

  addFile(file) {
    this.files.push(file);
  }

  readTextFile(file) {
    console.log(
      `Text file: ${file.name}, file content size: ${file.content.length}`
    );
  }

  readImageFile(file) {
    console.log(`Image file: ${file.name}, file size: ${file.size}kb`);
  }

  readVideoFile(file) {
    console.log(`Video file: ${file.name}, file duration: ${file.duration}s`);
  }

  readFiles() {
    for (const file of this.files) {
      if (file instanceof TextFile) {
        this.readTextFile(file);
      } else if (file instanceof ImageFile) {
        this.readImageFile(file);
      } else if (file instanceof VideoFile) {
        this.readVideoFile(file);
      }
    }
  }
}

const textFile = new TextFile("document.txt", "this is text file");
const imageFile = new ImageFile("image.png", 1024);
const videoFile = new VideoFile("video.mp4", 60);

const textEditor = new TextEditor();

textEditor.addFile(textFile);
textEditor.addFile(imageFile);
textEditor.addFile(videoFile);

textEditor.readFiles();

class PaymentSystem {
  makePayment(amount) {
    const convertedAmount = this.convertAmount(amount);
    console.log(`Make payment: $${convertedAmount}`);
  }

  convertAmount(amount) {
    return amount * 1.05;
  }
}

class OtherPaymnetSystem {
  submit(amount) {
    console.log(`Submiting payment request: $${amount}`);
  }
}

class PaymnetAdapter {
  constructor(paymentSystem) {
    this.paymentSystem = paymentSystem;
  }

  makePayment(amount) {
    const convertedAmount = this.convertAmount(amount);
    this.paymentSystem.submit(convertedAmount);
  }

  convertAmount(amount) {
    return amount * 1.05;
  }
}

class Order {
  constructor(amount) {
    this.amount = amount;

    if (amount < 100) this.paymentSystem = new PaymentSystem();
    else this.paymentSystem = new PaymnetAdapter(new OtherPaymnetSystem());
  }

  makePayment() {
    return this.paymentSystem.makePayment(this.amount);
  }
}

const order1 = new Order(1000);
const order2 = new Order(10);

order1.makePayment();
order2.makePayment();

class ShopingCart {
  constructor(discount) {
    this.discount = discount;
  }

  items = [];

  addItem(item) {
    this.items.push(item);
  }

  discount(price) {
    return price >= 100 ? price * 0.95 : price;
  }

  calculateTotalprice() {
    const totalPrice = this.items.reduce(
      (accum, item) => accum + item.price,
      0
    );

    const finalyPrice =
      totalPrice - this.discount.calculateDiscount(totalPrice);

    return finalyPrice;
  }
}

class DiscountStrategy {
  calculateDiscount(price) {
    return price;
  }
}

class RegularDiscountStrategy {
  calculateDiscount(price) {
    return price * 0.1;
  }
}

class PremiumDiscountStrategy {
  calculateDiscount(price) {
    return price * 0.15;
  }
}

class NewCustomerDiscountStrategy {
  calculateDiscount(price) {
    return price * 0.05;
  }
}

const shoppingCart1 = new ShopingCart(new PremiumDiscountStrategy());

shoppingCart1.addItem({ name: "iphone", price: 20 });
shoppingCart1.addItem({ name: "macbook", price: 80 });

console.log(shoppingCart1.calculateTotalprice());

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class UserGroup {
  users = [];

  addUser(user) {
    this.users.push(user);
  }
}

class UserIterator {
  #users = null;
  #currentIndex = 0;
  constructor(userGroup) {
    this.#users = userGroup.users;
  }

  #hasNext() {
    return this.#currentIndex < this.#users.length;
  }

  next() {
    if (this.#hasNext()) {
      const name = this.#users[this.#currentIndex].name;
      this.#currentIndex++;

      return name;
    }

    return null;
  }

  list() {
    return this.#users.map((user) => user.name).join(", ");
  }
}

const group = new UserGroup();

group.addUser(new User("Anton", "glantoshka@gmail.com", "password1"));
group.addUser(new User("Danya", "danyaokeys@gmail.com", "password2"));

const iterator = new UserIterator(group);
console.log(iterator.list());
*/

class User {
  constructor(name, chat) {
    this.name = name;
    this.chat = chat;
  }

  sendMessage(message) {
    console.log(`${this.name} send messagge ${message}`);
    return this.chat.sendMessagge(this, message);
  }

  receiveMessage(user, message) {
    console.log(`${this.name} received message from ${user.name}: ${message}`);
  }
}

class Chat {
  users = [];

  addUser(user) {
    this.users.push(user);
  }

  sendMessagge(sender, message) {
    for (const user of this.users) {
      if (user !== sender) {
        user.receiveMessage(sender, message);
      }
    }
  }
}

const chat = new Chat();

const user1 = new User("Anton", chat);
const user2 = new User("Danya", chat);
const user3 = new User("Roma", chat);

chat.addUser(user1);
chat.addUser(user2);
chat.addUser(user3);

user2.sendMessage("Hello everyone");
