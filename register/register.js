document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const errorMessage = document.getElementById('errorMessage');
  const sendSmsButton = document.getElementById('send-sms');
  const phoneInput = document.getElementById('phone');
  const smsCodeInput = document.getElementById('sms-code');

  // 註冊成功通知容器
  const successNotification = document.createElement('div');
  successNotification.id = 'successNotification';
  successNotification.textContent = '註冊成功！歡迎加入！';
  successNotification.style.display = 'none';
  document.body.appendChild(successNotification);

  // 隱藏通知
  const hideNotification = () => {
    successNotification.style.opacity = '0';
    setTimeout(() => {
      successNotification.style.display = 'none';
      window.location.href = '../index/index.html'; // 跳轉到 index.html
    }, 300); // 與 CSS 過渡時間一致
  };

  // 顯示通知
  const showNotification = () => {
    successNotification.style.display = 'block';
    setTimeout(() => {
      successNotification.style.opacity = '1';
    }, 10); // 確保過渡效果正常觸發
    setTimeout(hideNotification, 3000); // 3秒後隱藏並跳轉
  };

  // 表單提交處理
  if (form) {
    form.addEventListener('submit', function (event) {
      // 檢查密碼是否一致
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        errorMessage.textContent = '密碼不一致，請再次確認。';
        alert('密碼不一致，請再次確認。');
        event.preventDefault();
        return;
      } else {
        errorMessage.textContent = '';
      }

      // 檢查 SMS 驗證碼是否輸入
      if (smsCodeInput && !smsCodeInput.value) {
        alert('請輸入 SMS 驗證碼');
        event.preventDefault();
        return;
      }

      // 檢查手機號碼是否以 0 開頭
      const phoneNumber = phoneInput.value;
      if (!phoneNumber.startsWith('0')) {
        alert('手機號碼必須以 0 開頭');
        event.preventDefault();
        return;
      }

      // 通知註冊成功
      event.preventDefault(); // 停止實際表單提交，用於測試
      showNotification();
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

      if (!phoneNumber.startsWith('0')) {
        alert('手機號碼必須以 0 開頭');
        return;
      }

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
      if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
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
