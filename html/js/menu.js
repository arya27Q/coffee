document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================================
    // 1. FUNGSI FILTER KATEGORI (Menu Tabs)
    // ===========================================
    
    const filterButtons = document.querySelectorAll('.menu-category button');
    const menuGrids = document.querySelectorAll('.menu-grid');

    function filterMenuGrids(selectedCategory) {
        menuGrids.forEach(grid => {
            const gridId = grid.getAttribute('id');

            if (gridId === selectedCategory) {
                grid.classList.remove('hidden'); // Tampilkan grid yang cocok
            } else {
                grid.classList.add('hidden'); // Sembunyikan grid lainnya
            }
        });
    }

    // Event Listener untuk Tombol Filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');

            // Update status 'active' pada tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            filterMenuGrids(selectedCategory);
        });
    });

    // Inisialisasi: Tampilkan kategori default ('coffee')
    const initialCategory = document.querySelector('.menu-category button.active')?.getAttribute('data-category') || 'coffee';
    filterMenuGrids(initialCategory);


    // ===========================================
    // 2. FUNGSI ADD TO ORDER (localStorage)
    // ===========================================
    
    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Menggunakan .closest('.card') untuk menemukan parent card yang benar
            const card = btn.closest(".card"); 
            
            // Cek jika card ditemukan
            if (!card) return; 

            // Ambil data produk
            const name = card.querySelector("h3").innerText.trim();
            const priceText = card.querySelector("span").innerText; // "RP.15.000"
            
            // Hapus semua karakter non-digit dan konversi ke integer
            const price = parseInt(priceText.replace(/\D/g, "")); 
            
            if (isNaN(price)) {
                alert(`Gagal menambahkan ${name}. Harga tidak valid.`);
                return;
            }

            // Ambil atau inisialisasi orders dari localStorage
            let orders = JSON.parse(localStorage.getItem("orders")) || [];

            // Cek apakah item sudah ada di array berdasarkan nama
            const existing = orders.find(item => item.name === name);

            if (existing) {
                existing.quantity += 1; // Tambah jumlah
            } else {
                orders.push({ name, price, quantity: 1 });
            }

            // Simpan kembali array orders yang diperbarui ke localStorage
            localStorage.setItem("orders", JSON.stringify(orders));

            alert(`${name} (Rp ${price.toLocaleString('id-ID')}) berhasil ditambahkan ke pesanan!`);
        });
    });

});