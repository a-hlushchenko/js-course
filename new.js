function User(data) {
  if (new.target) {
    const { login = null, password = null, isAdmin = null, age = 0 } = data;

    const role = isAdmin ? "Admin" : "User";

    const object = Object.assign(this, {
      login,
      password,
      role,
      age,
    });

    if (role === "Admin") {
      object.verify = function (password) {
        return this.password === password;
      };
    }

    if (age >= 50) {
      object.login = object.login[0].toUpperCase() + object.login.slice(1);
    }

    object.toString = () => {
      return `користувач ${object.login}`;
    };

    return object;
  } else return new User(data);
}

const registerData = {
  login: "ivan12",
  password: "qwe123er",
  isAdmin: true,
};

const user = new User(registerData);

const adminData = {
  login: "admin12",
  password: "qwe123adm",
  isAdmin: true,
};

const adminUser = new User(adminData);

const testData = {
  login: "admin12",
  password: "qwe123adm",
  isAdmin: true,
  age: 52,
};

const testUser = User(testData);

User.prototype.test = "test";

console.log(user.verify("qwe123er"));

const verifyUser = user.verify;

console.log(verifyUser.call(user, "qwe123er"));

function Animal(name) {
  this.name = name;
}

function Person(name, age) {
  Animal.call(this, name);
  this.age = age;
}

const user2 = new Person("Anton", 15);

console.log(user2.name);
