<template>
    <div class="welcome-container left-align">
        <div class="welcome-card">
            <h1 class="welcome-title">ยินดีต้อนรับ</h1>
            <p class="welcome-message">
                ขอบคุณที่เข้าร่วมกับเรา<br>
                ขอให้คุณมีประสบการณ์ที่ดีในการใช้งาน
            </p>
            <div class="welcome-actions">
                <button class="welcome-btn">เริ่มต้นใช้งาน</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// No script needed for static welcome page
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');

.welcome-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0;
    justify-content: center;
    background: linear-gradient(135deg, #181818 0%, #232526 100%);
    font-family: 'Sarabun', 'Prompt', 'Kanit', Arial, sans-serif;
}

.welcome-card {
    background: rgba(30, 30, 30, 0.98);
    padding: 56px 40px 40px 40px;
    border-radius: 28px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.55);
    text-align: center;
    max-width: 420px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.welcome-title {
    color: #fff;
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 20px;
    letter-spacing: 1.5px;
}

.welcome-message {
    color: #d1d1d1;
    font-size: 1.18rem;
    line-height: 1.8;
    font-weight: 400;
    margin-bottom: 36px;
}

.welcome-actions {
    width: 100%;
    display: flex;
    justify-content: center;
}

.welcome-btn {
    background: linear-gradient(90deg, #222 0%, #444 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 14px 38px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.18);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    outline: none;
}

.welcome-btn:hover {
    background: linear-gradient(90deg, #333 0%, #555 100%);
    transform: translateY(-2px) scale(1.03);
}
</style>