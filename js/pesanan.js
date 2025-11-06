document.addEventListener('DOMContentLoaded', () => {
    const orderList = document.getElementById('order-list');
    const totalPriceDiv = document.getElementById('total-price');

    function renderOrders() {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orderList.innerHTML = '';

        if (orders.length === 0) {
            orderList.innerHTML = "<p>Belum ada pesanan.</p>";
            totalPriceDiv.innerHTML = '';
            return;
        }

        let total = 0;

        orders.forEach(item => {
            orderList.innerHTML += `<li>${item.name} x${item.quantity} - RP.${item.price.toLocaleString()}</li>`;
            total += item.price;
        });

        totalPriceDiv.innerHTML = `Total: RP.${total.toLocaleString()}`;
    }

    renderOrders();

    window.clearOrders = function() {
        localStorage.removeItem('orders');
        renderOrders();
    }
});
