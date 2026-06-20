const filterButtons = document.querySelectorAll(".filter-button");
const postCards = document.querySelectorAll(".post-card");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");

let activeFilter = "todos";

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updatePosts() {
  const searchTerm = normalizeText(searchInput.value.trim());
  let visibleCount = 0;

  postCards.forEach((card) => {
    const category = card.dataset.category;
    const content = normalizeText(card.textContent);
    const matchesCategory = activeFilter === "todos" || category === activeFilter;
    const matchesSearch = !searchTerm || content.includes(searchTerm);

    card.classList.toggle("is-hidden", !(matchesCategory && matchesSearch));
    if (matchesCategory && matchesSearch) {
      visibleCount += 1;
    }
  });

  emptyState.classList.toggle("is-visible", visibleCount === 0);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    updatePosts();
  });
});

searchInput.addEventListener("input", updatePosts);
