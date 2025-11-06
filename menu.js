// Ambil semua tombol kategori dan grid menu
const categoryButtons = document.querySelectorAll(".menu-category button");
const menuSections = document.querySelectorAll(".menu-grid");

// Tambah event listener buat tiap tombol
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Hapus kelas aktif dari semua tombol
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    // Tambah ke tombol yang diklik
    button.classList.add("active");

    // Ambil kategori dari tombol yang diklik
    const selectedCategory = button.getAttribute("data-category");

    // Sembunyikan semua menu
    menuSections.forEach(section => section.classList.add("hidden"));

    // Tampilkan menu sesuai kategori
    const activeSection = document.getElementById(selectedCategory);
    if (activeSection) activeSection.classList.remove("hidden");
  });
});
