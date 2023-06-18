import menu from './menu.json' assert { type: "json" };

const section = document.querySelector(".main");
const btnContainer = document.querySelector(".btn-container");
const form = document.querySelector(".search-form");
const input = form.querySelector(".search-input");

// get unique categories
const categories = menu.reduce(
  (values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  },
  ["All"]
);

// create category buttons
const categoryList = () => {
  const categoryBtns = categories
    .map((category) => {
      return `<button class="btn-item" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  
  const filterBtns = document.querySelectorAll(".btn-item");

  // filter menu with category buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "All") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
};

// display menu items
const displayMenuItems = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    return `<ul class="cards">
    <li class="cards_item">
      <div class="card">
        <div class="card_price">${item.price}</div>
        <div class="card_image">
          <img src=${item.img} alt=${item.title}></div>
        <div class="card_content">
          <h2 class="card_title">${highlightSearch(item.title)}</h2>
          <div class="card_text">${highlightSearch(item.desc)}</div>
        </div>
      </div>
    </li>
  </ul>`;
  });
  displayMenu = displayMenu.join("");
  section.innerHTML = displayMenu;
};

// highlight search text
const highlightSearch = (text) => {
  const searchValue = input.value.toLowerCase().trim();
  if (searchValue !== "") {
    const regex = new RegExp(searchValue, "gi");
    text = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }
  return text;
};

// filter menu with search input
input.addEventListener("keyup", () => {
  const searchValue = input.value.toLowerCase().trim();
  const filteredMenu = menu.filter((item) => {
    if (item.title.toLowerCase().includes(searchValue) || item.desc.toLowerCase().includes(searchValue)) {
      return item;
    }
  });
  displayMenuItems(filteredMenu);
});

// initial display of menu items
displayMenuItems(menu);
categoryList();