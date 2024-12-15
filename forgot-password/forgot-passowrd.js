document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forgotPasswordForm');
    const usernameEmailInput = document.getElementById('username-email');
    const messageDiv = document.getElementById('message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();  // 防止表單提交
  
      const usernameOrEmail = usernameEmailInput.value.trim();
  
      if (!usernameOrEmail) {
        messageDiv.textContent = '請輸入帳號或電子郵件';
        return;
      }
  
      // 模擬發送重設密碼鏈接（實際應該呼叫後端 API）
      setTimeout(function () {
        messageDiv.textContent = '如果您的帳號存在，我們已經發送了重設密碼的鏈接至您的電子郵件。';
        messageDiv.style.color = '#28a745';  // 顯示成功訊息
        usernameEmailInput.value = ''; // 清空輸入框
      }, 1500);  // 模擬處理時間
    });
  });
  