// 取得按鈕和模態框元素
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.getElementById("submitBtn");

// 點擊登入按鈕時顯示模態框
btn.addEventListener("click", () => {
    modal.style.display = "block";
});

// 點擊關閉按鈕時隱藏模態框
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// 點擊模態框外部時隱藏模態框
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// 提交按鈕事件，顯示會員名字
submitBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    if (username) {
        btn.textContent = `Hi! ${username}`;
        modal.style.display = "none";
    } else {
        alert("請輸入用戶名！");
    }
});
