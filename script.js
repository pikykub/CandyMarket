import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBORnXLQdZnETh9AMFMUx50FlLylKCVc2w",
    authDomain: "web-rental-system-d8894.firebaseapp.com",
    projectId: "web-rental-system-d8894",
    databaseURL: "https://web-rental-system-d8894-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- การควบคุม Modal ---
window.openModal = (id) => document.getElementById(id).style.display = 'flex';
window.closeModal = (id) => document.getElementById(id).style.display = 'none';

// --- ระบบ Login (Admin: adminpeach / Pass: khaohom155454) ---
const authSection = document.getElementById('auth-section');

window.checkAuth = () => {
    const user = localStorage.getItem('candy_user');
    if (user) {
        authSection.innerHTML = `
            <div class="flex items-center gap-2">
                ${user === 'Admin Peach' ? '<a href="admin.html" class="text-[10px] bg-yellow-400 text-white px-2 py-1 rounded-full font-bold">แผงควบคุม</a>' : ''}
                <div onclick="logout()" class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff9a9e] to-[#ffecd2] flex items-center justify-center text-white border-2 border-white cursor-pointer shadow-sm">
                    <i class="fa-solid fa-user-astronaut"></i>
                </div>
            </div>`;
    } else {
        authSection.innerHTML = `<button onclick="openModal('login-modal')" class="bg-pink-400 text-white px-6 py-2 rounded-full text-sm font-black shadow-md">เข้าสู่ระบบ</button>`;
    }
};

document.getElementById('btn-do-login').onclick = () => {
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    if(u === 'adminpeach' && p === 'khaohom155454') {
        localStorage.setItem('candy_user', 'Admin Peach');
        location.reload();
    } else {
        alert("รหัสไม่ถูกต้องน้าา");
    }
};

window.logout = () => { if(confirm('จะไปแล้วหรอคะ?')) { localStorage.removeItem('candy_user'); location.reload(); }};

// --- ดึงข้อมูลจาก Firebase ---
onValue(ref(db,'products'), snap => {
    const container = document.getElementById('product-container');
    if(!container) return;
    container.innerHTML = '';
    snap.forEach(child => {
        const p = child.val();
        container.innerHTML += `
            <div class="bg-white border-2 border-pink-50 rounded-[2rem] p-3 shadow-sm">
                <img src="${p.image}" class="rounded-[1.5rem] mb-2 aspect-square object-cover">
                <h4 class="font-bold text-xs text-gray-700 truncate">${p.name}</h4>
                <p class="text-pink-500 font-black text-lg">฿${p.price}</p>
            </div>`;
    });
});

onValue(ref(db,'stats'), snap => {
    const d = snap.val() || {};
    if(document.getElementById('stat-users')) document.getElementById('stat-users').innerText = d.users || 0;
    if(document.getElementById('stat-prods')) document.getElementById('stat-prods').innerText = d.prods || 0;
});

// ปิด Loader
setTimeout(() => { document.getElementById('loader').style.opacity = '0'; setTimeout(()=> document.getElementById('loader').style.display='none', 500); }, 800);
checkAuth();
