// DATA DUMMY MENU KANTIN
const menuData = [
    { id: 1, name: "Nasi Goreng Spesial", category: "makanan", price: 15000, desc: "Nasi goreng dengan telur, bakso, dan suwiran ayam.", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Mie Ayam Bakso", category: "makanan", price: 13000, desc: "Mie kenyal dengan topping ayam gurih dan bakso sapi.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Es Teh Manis", category: "minuman", price: 4000, desc: "Teh melati segar disajikan dengan es batu.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Jus Alpukat", category: "minuman", price: 8000, desc: "Jus alpukat kental dengan tambahan susu kental manis cokelat.", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Kentang Goreng", category: "snack", price: 10000, desc: "Kentang goreng renyah dengan taburan bumbu balado.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" }
];

// STATE APLIKASI
let cart = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tangkap Nomor Meja dari URL (Contoh: index.html?meja=05)
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('meja') || '1 (Default)';
    document.getElementById('tableInfo').textContent = `Nomor Meja: ${tableNumber}`;

    // Render awal menu
    renderMenu(menuData);

    // 2. Event Listener Pencarian
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterAndRender(e.target.value, currentCategory);
    });

    // 3. Event Listener Kategori Filter
    const catButtons = document.querySelectorAll('.cat-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            catButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-category');
            const keyword = document.getElementById('searchInput').value;
            filterAndRender(keyword, currentCategory);
        });
    });

    // 4. Modal Interaksi Keranjang
    const cartModal = document.getElementById('cartModal');
    document.getElementById('btnOpenCart').addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCartItems();
    });
    document.getElementById('btnCloseCart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // 5. Konfirmasi Pesanan
    document.getElementById('btnConfirmOrder').addEventListener('click', () => {
        if(cart.length === 0) {
            alert('Keranjang Anda masih kosong!');
            return;
        }
        alert(`Pesanan untuk Meja ${tableNumber} berhasil dikirim ke dapur! Silakan tunggu sebentar.`);
        cart = [];
        updateCartUI();
        cartModal.style.display = 'none';
    });
});

// FUNGSI RENDER MENU KE HTML
function renderMenu(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    if(items.length === 0) {
        menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">Menu tidak ditemukan.</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="menu-img">
            <div class="menu-info">
                <h3 class="menu-title">${item.name}</h3>
                <p class="menu-desc">${item.desc}</p>
                <div class="menu-footer">
                    <span class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})">+ Tambah</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// FUNGSI FILTER BERDASARKAN PENCARIAN & KATEGORI
function filterAndRender(keyword, category) {
    let filtered = menuData.filter(item => {
        const matchesKeyword = item.name.toLowerCase().includes(keyword.toLowerCase());
        const matchesCategory = category === 'all' || item.category === category;
        return matchesKeyword && matchesCategory;
    });
    renderMenu(filtered);
}

// FUNGSI TAMBAH KE KERANJANG
function addToCart(id) {
    const product = menuData.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
}

// UPDATE TAMPILAN FLOATING BAR & JUMLAH
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const cartBar = document.getElementById('cartBar');
    if (totalItems > 0) {
        cartBar.classList.remove('hidden');
        document.getElementById('cartCount').textContent = `${totalItems} item`;
        document.getElementById('cartTotal').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    } else {
        cartBar.classList.add('hidden');
    }
}

// RENDER ITEM DI DALAM MODAL KERANJANG
function renderCartItems() {
    const container = document.getElementById('cartItemsList');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #64748b;">Keranjang kosong</p>`;
        document.getElementById('modalTotal').textContent = 'Rp 0';
        return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        totalPrice += subtotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small style="color: #64748b;">Rp ${item.price.toLocaleString('id-ID')} x ${item.qty}</small>
            </div>
            <div>
                <strong>Rp ${subtotal.toLocaleString('id-ID')}</strong>
            </div>
        `;
        container.appendChild(row);
    });

    document.getElementById('modalTotal').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}
