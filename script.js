// DATA DUMMY MENU CAFFE ZIPOOR
const menuData = [
    { id: 1, name: "Nasi Goreng Spesial", category: "makanan", price: 15000, desc: "Nasi goreng dengan telur, bakso, dan suwiran ayam.", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Mie Ayam Bakso", category: "makanan", price: 13000, desc: "Mie kenyal dengan topping ayam gurih dan bakso sapi.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Es Teh Manis", category: "minuman", price: 4000, desc: "es Teh melati segar disajikan dengan es batu.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Jus Alpukat", category: "minuman", price: 8000, desc: "Jus alpukat kental dengan tambahan susu kental manis cokelat.", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "bihun" , category: "makanan", price: 15000, desc: "bihun goreng dengan ayam suir", img: "https://share.google/xr48AVG5hJjpNePzb" },
    { id: 6, name: "kwai tiau" , category: "makanan", price: 15000, desc: "kwai tiau goreng dengan toping telur oreg", img: "https://share.google/esC52tF6w0XTKTHCu" },
    { id: 7, name: "ayam katsu" , category: "makanan", price: 15000, desc: "ayam katsu dan nasi", img: "https://share.google/QldUt8Dz5RLShk9nx" },
    { id: 8, name: "telor cripsy" , category: "makanan", price: 15000, desc: " btelor krispy", img "https://share.google/ZAYGp7WuDzfYp0boL" },
    { id: 9, name: "ayam geprek" , category: "makanan", price: 15000, desc: "ayam geprek dengan sambal mata" , img: "https://share.google/QdDZF5Ftfn6Vlyq8b" },
    { id: 10, name: "lontong sayur" , category: "makanan", price: 15000, desc: "lontong sayur", img: "https://share.google/uTistrF0p2lhhCNgG" },
    { id: 11, name: "ayam sayur" , category: "makanan", price: 15000, desc:"ayam sayur", img: "https://share.google/AtpVEAMIjfAS6TOrG" },
    { id: 12, name: "roti isi" , category: "makanan", price: 15000, desc: "roti isi daging dengan sauce mayonice", img: "https://share.google/rO7I9oLNIfHgNEsVK" },
    { id: 13, name: "roti bakar" , category: "makanan", price: 15000, desc: "roti bakar rasa stroberi coklat", img: "https://share.google/Hs80cbsRgQcezRP7O" },
    { id: 14, name: "roti bakar" , category: "makanan", price: 15000, desc: "roti bakar rasa keju dan coklat", img: "https://share.google/9VuK5RxLWBV2P8ppK" },
    { id: 15, name: "martabak manis" , category: "makanan", price: 15000, desc: "martabak manis", img: "https://share.google/gmsg07c5e7yJ4cLsq" },
    { id: 16, name: "martabak asin" , category: "makanan", price: 15000, desc: "martabak asin", img: "https://share.google/V2j7MxKSpEFKrsfEO" },
    { id: 17, name: "sup iga" , category: "makanan", price: 15000, desc: "sup iga", igm: "https://share.google/IzjKScBNPfLN5eSqr" },
    { id: 18, name: "wedang ronde" , category: "minuman", price: 4000, desc: "wedang ronde", igm: "https://share.google/861wLzHZRgOMS8jLh" },
    { id: 19, name: "kopi tubruk " , category: "minuman", price: 4000, desc: "kopi tubruk", igm: "https://share.google/DquHti38Emvpf2NLY" },
    { id: 20, name: "nescafe" , category: "minuman", price: 4000, desc: "nescafe", igm: "https://share.google/wPlsCXV9XQT0eO6O8" },
    { id: 21, name: "americano" , category: "minuman", price: 4000, desc: "americano", igm: "https://share.google/8YIRsge8DBGhzu1V0" },
    { id: 22, name: "expreso" , category: "minuman", price: 4000, desc: "expreso", igm: "https://share.google/SDUnq8xUcbViXKIAp" },
    { id: 23, name: "stmj" , category: "minuman", price: 4000, desc: "stmj", igm: "https://share.google/yBEe4xM1gode2Zyfu" },
    { id: 24, name: "susu kocok" , category: "minuman", price: 4000, desc: "susu kocok", igm: "https://share.google/aaHJEzWEhTfJD32E2" },
    { id: 25, name: "joshua" , category: "minuman", price: 4000, desc: "joshua", igm: "https://share.google/LlUGv1f1O6t7H71E9" },

                      

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
    const totalItems = cart.reduce((sum, item) => sum +( - ) (item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum +( - )(item.price * item.qty), 0);

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
