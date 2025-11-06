
const categoryButtons = document.querySelectorAll(".menu-category button");
const menuSections = document.querySelectorAll(".menu-grid");


categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    
    button.classList.add("active");

    
    const selectedCategory = button.getAttribute("data-category");

   
    menuSections.forEach(section => section.classList.add("hidden"));

   
    const activeSection = document.getElementById(selectedCategory);
    if (activeSection) activeSection.classList.remove("hidden");
  });
});
