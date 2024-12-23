document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('loginModal'); // 模態框
  const closeModalBtn = document.querySelector('.close-btn'); // 關閉按鈕
  const loginBtn = document.getElementById('loginBtn'); // 假設有一個外部登入按鈕
  const submitBtn = document.getElementById('submitBtn'); // 提交按鈕
  const passwordInput = document.getElementById('password'); // 密碼輸入框
  const refreshCaptchaBtn = document.getElementById('refreshCaptcha'); // 更換驗證碼按鈕
  const captchaElement = document.getElementById('captcha'); // 驗證碼顯示
  const captchaInput = document.getElementById('captchaInput'); // 驗證碼輸入框
  const userDropdown = document.getElementById('userDropdown'); // 用戶下拉選單
  const userBtn = document.getElementById('userBtn'); // 顯示用戶名的按鈕
  const usernameDisplay = document.getElementById('usernameDisplay'); // 用戶名顯示區域
  const logoutBtn = document.getElementById('logoutBtn'); // 登出按鈕
  const dropdownMenu = document.getElementById('dropdownMenu'); // 下拉菜單

  if (!loginModal || !closeModalBtn || !submitBtn || !passwordInput || !captchaElement || !refreshCaptchaBtn || !captchaInput) {
    console.error('某些必要的 DOM 元素未找到，請檢查 HTML 結構');
    return;
  }

  // 初始化驗證碼
  function generateCaptcha() {
    const chars = '0123456789';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaElement.innerText = newCaptcha;
    return newCaptcha;
  }

  let captcha = generateCaptcha(); // 初始生成驗證碼

  // 點擊登入按鈕顯示模態框
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });
  }

  // 點擊關閉按鈕隱藏模態框
  closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });

  // 點擊模態框外部隱藏模態框
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  // 更換驗證碼
  refreshCaptchaBtn.addEventListener('click', () => {
    captcha = generateCaptcha();
    alert('驗證碼已更換！');
  });

  // 提交按鈕邏輯
  submitBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = passwordInput.value.trim();
    const captchaInputValue = captchaInput.value.trim();

    if (!username || !password || !captchaInputValue) {
      alert('請輸入帳號、密碼和驗證碼！');
      return;
    }

    if (captchaInputValue !== captcha) {
      alert('驗證碼錯誤，請重新輸入！');
      return;
    }

    if (password === '1234') {
      alert(`登入成功！歡迎回來，${username}。`);
      loginModal.style.display = 'none';

      // 顯示用戶名並顯示下拉選項
      loginBtn.style.display = 'none'; // 隱藏登入按鈕
      userDropdown.style.display = 'block'; // 顯示用戶名和下拉選單
      usernameDisplay.textContent = username; // 顯示用戶名

    } else {
      alert('帳號或密碼錯誤，請重新輸入。');
    }
  });

  // 點擊用戶名顯示下拉選單
  userBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // 點擊登出按鈕，清除登入狀態
  logoutBtn.addEventListener('click', () => {
    loginBtn.style.display = 'block'; // 顯示登入按鈕
    userDropdown.style.display = 'none'; // 隱藏用戶名和下拉選單
    alert('您已成功登出！');
  });
});
