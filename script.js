// Initial Data
const userProfile = {
    balance: 1240.50,
    connectedApps: [
        { name: "Messenger Go", icon: "💬" },
        { name: "Marketplace Plus", icon: "🛒" },
        { name: "Task Tracker", icon: "✅" }
    ]
};

// 1. Animate Wallet Balance
function animateBalance(target) {
    const el = document.getElementById('wallet-balance');
    let current = 0;
    const duration = 1500; // 1.5 seconds
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = `$${target.toLocaleString()}`;
            clearInterval(timer);
        } else {
            el.innerText = `$${current.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }
    }, stepTime);
}

// 2. Render Apps
function renderApps() {
    const grid = document.getElementById('app-grid');
    grid.innerHTML = userProfile.connectedApps.map(app => `
        <div class="app-item">
            <div style="font-size: 2rem">${app.icon}</div>
            <p style="margin: 10px 0 0">${app.name}</p>
        </div>
    `).join('');
}

// 3. Connect App Logic
function showConnectModal() {
    if (userProfile.connectedApps.length >= 3) {
        document.getElementById('modal').style.display = 'grid';
    } else {
        alert("Connecting new goAPP...");
        // Logic to add app would go here
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Initialize
window.onload = () => {
    animateBalance(userProfile.balance);
    renderApps();
};
