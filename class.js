class Person {
  constructor(name) {
    this.name = name;
  }

  test = () => {
    console.log("Hello world", this.name);
  };
}

class User extends Person {
  constructor(login, password) {
    super(login);

    this.login = login;
    this.password = password;
  }
  login = null;
  password = null;
  #role = null;
  static age = null;
  #id = 1244;

  isAdmin = () => {
    console.log(this.#id);
    return this.role === "Admin";
  };

  createAdminUser = (login) => {
    const password = this.generateRandomPassword();
    return new User();
  };

  static generateRandomPassword = () => {
    return;
  };

  get admin() {
    return this.#role === "Admin";
  }

  set admin(value) {
    return (this.#role = "Admin");
  }
}

const user = new User("Anton12", "qwet4326");
user.role = "Admin";

function verifyAdmin(fn) {
  const result = fn();

  if (result) return true;

  throw new Error("не адмін");
}

console.log(user instanceof User);
