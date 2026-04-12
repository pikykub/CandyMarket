// ข้อมูล Admin ที่คุณกำหนด
const ADMIN_USER = "adminpeach";
const ADMIN_PASS = "khaohom155454";

// ฟังก์ชันควบคุม Modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// ระบบเข้าสู่ระบบ
function handleLogin() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    // 1. เช็ค Admin ก่อน
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        setLoginSession("Admin Peach");
    } 
    // 2. เช็คคนสมัครทั่วไปใน LocalStorage
    else {
        const storedPass = localStorage.getItem(user);
        if (storedPass && storedPass === pass) {
            setLoginSession(user);
        } else {
            alert("งือออ... ชื่อหรือรหัสผ่านผิดค่ะ ลองใหม่นะ!");
        }
    }
}

// ระบบสมัครสมาชิก
function handleRegister() {
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    if (user && pass) {
        localStorage.setItem(user, pass);
        alert("สมัครเรียบร้อย! เย้~ ลองเข้าสู่ระบบดูนะคะ");
        closeModal('register-modal');
    } else {
        alert("กรอกข้อมูลให้ครบก่อนน้าา");
    }
}

// เปลี่ยนสถานะหน้าเว็บเมื่อ Login สำเร็จ
function setLoginSession(name) {
    document.getElementById('guest-mode').style.display = "none";
    document.getElementById('user-mode').style.display = "block";
    document.getElementById('display-name').innerText = name;
    closeModal('login-modal');
}

// ออกจากระบบ
function logout() {
    document.getElementById('guest-mode').style.display = "block";
    document.getElementById('user-mode').style.display = "none";
    alert("ออกจากระบบแล้วค่ะ บ๊ายบาย~");
}

// ปิด Modal เมื่อคลิกข้างนอกกล่อง
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}
