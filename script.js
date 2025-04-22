// Define food data
const foodData = {
  "Shrimp (wild)": 220,
  "Tropical fruit": 115,
  "Salmon (farmed)": 84,
  "Beef (feedlots)": 90,
  "Beef (frozen)": 75,
  "Tomatoes (greenhouse)": 66,
  "Pork": 47.5,
  "Pork (frozen)": 43,
  "Chicken": 30,
  "Chicken (frozen)": 41,
  "Herring (wild)": 22,
  "Clams": 19,
  "Eggs": 18,
  "Apples (imported)": 8.6,
  "Soybeans": 7.9,
  "Honey (imported)": 5.6,
  "Tomatoes (fresh)": 5.4,
  "Milk": 5,
  "Apples (local)": 3.5,
  "Laying hens": 475,
  "Grains": 35.61,
};

// Initialize Choices.js on the food select element
const foodSelect = document.getElementById("food-select");
const choices = new Choices(foodSelect, {
  removeItemButton: true,
  placeholderValue: 'Select food items',
  searchPlaceholderValue: 'Type to search',
});

// Populate the select with food options
Object.keys(foodData).forEach(item => {
  const option = document.createElement("option");
  option.value = item;
  option.text = item;
  foodSelect.appendChild(option);
});

// Handle form submission
document.getElementById("food-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const selectedItems = choices.getValue(true); // array of selected values
  const subtotal = selectedItems.reduce((sum, item) => sum + (foodData[item] || 0), 0);
  document.getElementById("food-result").textContent = `Food petroleum footprint: ${subtotal} MJ`;
  totalMJ += subtotal;
  updateTotal();
});


const transportationData = {
  "Car (gasoline)": 4.852,
  "Bus": 1.3197,
  "Flight": 17.21998,
  "Train (diesel)": 1.2,
  "Bike/Walk": 0
};

const clothingData = {
  "Nylon": 250,
  "Acrylic": 175,
  "Polyester": 125,
  "Polypropylene": 115,
  "Viscose": 100,
  "Wool": 63,
  "Cotton": 55,
};

const techData = {
  "Smartphone": 1400,
  "Laptop": 1800,
  "Tablet": 750,
  "Daily use (generic)": 10
};

let totalMJ = 0;

// Food
document.getElementById("food-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const selectedItems = [...document.querySelectorAll("#food-select option:checked")].map(option => option.value);
  const subtotal = selectedItems.reduce((sum, item) => sum + (foodData[item] || 0), 0);
  document.getElementById("food-result").textContent = `Food petroleum footprint: ${subtotal} MJ`;
  updateTotal();
});

// Transport
document.getElementById("transport-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const miles = parseFloat(document.getElementById("distance").value);
  const selectedModes = [...document.querySelectorAll("#transport-mode option:checked")].map(option => option.value);
  const subtotal = selectedModes.reduce((sum, mode) => sum + miles * (transportationData[mode] || 0), 0);
  document.getElementById("transport-result").textContent = `Transport petroleum footprint: ${subtotal.toFixed(2)} MJ`;
  updateTotal();
});

// Clothing
document.getElementById("clothing-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const selectedItems = [...document.querySelectorAll("#clothing-select option:checked")].map(option => option.value);
  const subtotal = selectedItems.reduce((sum, item) => sum + (clothingData[item] || 0), 0);
  document.getElementById("clothing-result").textContent = `Clothing petroleum footprint: ${subtotal} MJ`;
  updateTotal();
});

// Technology
document.getElementById("tech-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const selectedItems = [...document.querySelectorAll("#tech-select option:checked")].map(option => option.value);
  const subtotal = selectedItems.reduce((sum, item) => sum + (techData[item] || 0), 0);
  document.getElementById("tech-result").textContent = `Technology petroleum footprint: ${subtotal} MJ`;
  updateTotal();
});

// Update total footprint
function updateTotal() {
  const foodFootprint = parseFloat(document.getElementById("food-result").textContent.match(/[\d.]+/) || 0);
  const transportFootprint = parseFloat(document.getElementById("transport-result").textContent.match(/[\d.]+/) || 0);
  const clothingFootprint = parseFloat(document.getElementById("clothing-result").textContent.match(/[\d.]+/) || 0);
  const techFootprint = parseFloat(document.getElementById("tech-result").textContent.match(/[\d.]+/) || 0);

  const total = foodFootprint + transportFootprint + clothingFootprint + techFootprint;
  document.getElementById("total-result").textContent = `Total: ${total.toFixed(2)} MJ`;
}
