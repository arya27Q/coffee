document.addEventListener("DOMContentLoaded", function () {
  const orderButton = document.querySelector(".hero-order-btn");

  const partnerLinks = document.querySelectorAll(".partners-list a");

  if (orderButton) {
    orderButton.addEventListener("click", function () {
      alert(
        "Aplikasi pemesanan internal tidak tersedia!"
      );
    });
  }

  partnerLinks.forEach((link) => {
    link.addEventListener("click", function (event) {

      const partnerName = link.querySelector(".partner-card").textContent;

      console.log(`Pengguna mengklik tautan mitra: ${partnerName}`);
    });
  });
});
