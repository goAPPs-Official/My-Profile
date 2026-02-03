// INITIAL DATA
let currentBalance = parseFloat(localStorage.getItem('goApps_balance')) || 1250;
let posts = JSON.parse(localStorage.getItem('goApps_posts')) || [{ id: 1, content: "Welcome to goApps! 💸", time: "2h ago", likes: 5, likedByMe: false }];
const friends = [{ name: "Sarah Miller", img: "https://i.pravatar.cc/150?u=sarah" }, { name: "David Chen", img: "https://i.pravatar.cc/150?u=david" }];

// ELEMENTS
const balanceEl = document.getElementById('balance-amount');
const postFeed = document.getElementById('post-feed');

// INITIALIZE APP
window.addEventListener('load', () => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('goApps_theme') || 'light');
    balanceEl.innerText = currentBalance;
    renderPosts();
    renderFriends();
    
    // Hide Splash
    setTimeout(() => { document.getElementById('splash-screen').style.display = 'none'; }, 1500);
});

// WALLET LOGIC
document.getElementById('topup-btn').addEventListener('click', () => {
    const code = prompt("Enter 5-digit code:");
    if (/^\d{5}$/.test(code)) updateBalance(500, false);
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
    const amount = parseFloat(prompt("Amount:"));
    if (amount > 0 && amount <= currentBalance) updateBalance(amount, true);
});

function updateBalance(amount, isWithdrawal) {
    const start = currentBalance;
    currentBalance = isWithdrawal ? currentBalance - amount : currentBalance + amount;
    animateValue(start, currentBalance, 1000);
    localStorage.setItem('goApps_balance', currentBalance);
    showNotification(isWithdrawal ? "Withdrawal" : "Top Up", `New Balance: $${currentBalance}`);
}

function animateValue(start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        balanceEl.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// PWA & NOTIFICATIONS
function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}
if ('Notification' in window) Notification.requestPermission();

// SHARE LOGIC
document.getElementById('share-profile').addEventListener('click', async () => {
    try {
        await navigator.share({ title: 'goApps', url: window.location.href });
    } catch (e) {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }
});

// MODAL CONTROLS
document.getElementById('open-edit').addEventListener('click', () => document.getElementById('edit-modal').style.display = 'flex');
document.getElementById('cancel-edit').addEventListener('click', () => document.getElementById('edit-modal').style.display = 'none');
document.getElementById('theme-toggle').addEventListener('click', () => {
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', now);
    localStorage.setItem('goApps_theme', now);
});

// RENDERING
function renderPosts() {
    postFeed.innerHTML = posts.map(p => `<div class="card"><strong>Alex</strong> <small>${p.time}</small><p>${p.content}</p></div>`).join('');
}
function renderFriends() {
    document.getElementById('friends-container').innerHTML = friends.map(f => `<div class="friend-item" style="display:flex; justify-content:space-between; margin:10px 0;"><span>${f.name}</span><button class="primary-btn" style="padding:4px 8px" onclick="alert('Money Sent!')">Send</button></div>`).join('');
}
