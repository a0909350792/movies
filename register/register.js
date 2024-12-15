document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('errorMessage');
    const sendSmsButton = document.getElementById('send-sms');
    const phoneInput = document.getElementById('phone');
    const smsCodeInput = document.getElementById('sms-code');
  
    let lastInputTime = Date.now();
    const typingSpeedLimit = 200;
  
   
  
    // 表單提交處理
    if (form) {
      form.addEventListener('submit', function (event) {
        // 檢查密碼是否一致
        if (password && confirmPassword && password.value !== confirmPassword.value) {
          // 顯示錯誤訊息
          errorMessage.textContent = '密碼不一致，請再次確認。';
          alert('密碼不一致，請再次確認。');
          event.preventDefault();  // 阻止表單提交
          return;  // 停止執行其他代碼
        } else {
          errorMessage.textContent = ''; // 清除錯誤訊息
        }
  
        // 檢查 SMS 驗證碼是否輸入
        if (smsCodeInput && !smsCodeInput.value) {
          alert('請輸入 SMS 驗證碼');
          event.preventDefault();
        }
  
        // 檢查手機號碼是否以 0 開頭
        const phoneNumber = phoneInput.value;
        if (!phoneNumber.startsWith('0')) {
          alert('手機號碼必須以 0 開頭');
          event.preventDefault();
        }
      });
    }
  
    // 發送 SMS 按鈕處理
    if (sendSmsButton) {
      sendSmsButton.addEventListener('click', function () {
        const phoneNumber = phoneInput.value;
        if (!phoneNumber) {
          alert('請輸入手機號碼');
          return;
        }
  
        // 檢查手機號碼是否以 0 開頭
        if (!phoneNumber.startsWith('0')) {
          alert('手機號碼必須以 0 開頭');
          return;
        }
  
        // 檢查手機號碼格式（10位數）
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
          alert('手機號碼格式錯誤，請確保手機號碼以 0 開頭且為 10 位數字。');
          return;
        }
  
        alert('驗證碼已發送至 ' + phoneNumber);
      });
    }
  
    // 只允許數字輸入並限制手機號碼長度為 10 位
    if (phoneInput) {
      phoneInput.addEventListener('keydown', function (event) {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
        if (
          !/^\d$/.test(event.key) && 
          !allowedKeys.includes(event.key)
        ) {
          event.preventDefault();
        }
      });
  
      phoneInput.addEventListener('input', function () {
        if (phoneInput.value.length > 10) {
          phoneInput.value = phoneInput.value.slice(0, 10);
        }
      });
    }
  });
  