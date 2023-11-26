const prompt = require("prompt-sync")();

const menu = [
  { category: "Макі", title: "Каліфорнія", price: 70000, weight: "1 кг", ingredients: ['Рис', 'Соус', 'Морська риба'], address: "Sushi Delivery" },
  { category: "Макі", title: "Філадельфія", price: 80000, weight: "1 кг", ingredients: ['Рис', 'Лосось', 'Сир', 'Огірок'], address: "Sushi Delivery" },
  { category: "Нігірі", title: "Лосось", price: 60000, weight: "100 г", ingredients: ['Рис', 'Лосось', 'Васабі'], address: "Sushi Delivery" },
  { category: "Нігірі", title: "Креветка", price: 65000, weight: "100 г", ingredients: ['Рис', 'Креветка', 'Соєвий соус'], address: "Sushi Delivery" },
  { category: "Сашімі", title: "Тунець", price: 80000, weight: "150 г", ingredients: ['Тунець', 'Соєвий соус', 'Васабі'], address: "Sushi Delivery" },
  { category: "Сашімі", title: "Лосось", price: 75000, weight: "150 г", ingredients: ['Лосось', 'Соєвий соус', 'Васабі'], address: "Sushi Delivery" }
];

let statusDelivery = null;
let person = null;
let myOrder = null;

introScene();

function introScene() {
  console.clear();
  console.log("Ласкаво просимо до доставки суші!");
  person = { Name: prompt("Введіть ваше ім'я: "), Phone: prompt("Введіть ваш телефон: "), Address: prompt("Введіть вашу адресу: ") };
  comandMenu();
}

function comandMenu() {
  console.clear();
  console.log(`Привіт, ${person.Name}! ${statusDelivery ? `Статус: ${statusDelivery}` : ''}`);
  console.log("1. Показати МЕНЮ");
  console.log("2. Моє Замовлення");
  console.log("3. Вихід");
  switch (prompt("Введіть свій вибір: ")) {
    case "1": menuOfDishes(); break;
    case "2": showOrder(); break;
    case "3": process.exit(0); break;
    default: console.log("Невірний вибір. Спробуйте ще раз."); comandMenu();
  }
}

function menuOfDishes() {
  console.clear();
  console.log("МЕНЮ:");
  menu.forEach((item, index) => console.log(`${index + 1}. ${item.category} - ${item.title} - ${item.price / 100} грн`));
  const choice = prompt("Введіть номер бажаної страви або 'R', щоб повернутися до головного меню: ");
  if (choice.toUpperCase() === "R") comandMenu();
  const dishIndex = parseInt(choice) - 1;
  if (!isNaN(dishIndex) && dishIndex >= 0 && dishIndex < menu.length) dateAboutOrder(menu[dishIndex]);
  else console.log("Невірний вибір. Спробуйте ще раз."), menuOfDishes();
}

function dateAboutOrder(selectedDish) {
  console.clear();
  console.log(`Ваше замовлення: ${selectedDish.title}`);
  console.log(`Інгредієнти: ${selectedDish.ingredients.join(', ')}`);
  console.log(`Вага: ${selectedDish.weight}`);
  console.log(`Доставка за адресою: ${person.Address}`);
  console.log(`Ціна: ${selectedDish.price / 100} грн`);
  console.log(`Разом: ${(selectedDish.price / 100)} грн`);
  const confirm = prompt("Введіть 'Y', щоб підтвердити замовлення, або 'N', щоб повернутися до головного меню: ");
  if (confirm.toUpperCase() === "Y") {
    myOrder = { Recipient: person.Name, YourOrder: selectedDish.title, Ingredients: selectedDish.ingredients, AddressFrom: selectedDish.address, AddressTo: person.Address, TotalPrice: selectedDish.price / 100 };
    statusDelivery = "В процесі";
    console.log("Замовлення підтверджено! В процесі.");
  }
  comandMenu();
}

function showOrder() {
  console.clear();
  console.log(myOrder || "Немає поточного замовлення.");
  if (statusDelivery === "Успішно") myOrder = statusDelivery = null, console.log("Замовлення видалено. Дякуємо за покупку!");
  else statusDelivery = prompt("Введіть 'Y', якщо замовлення отримано, або 'N', якщо ні: ") === "Y" ? "Успішно" : "В процесі";
  comandMenu();
}