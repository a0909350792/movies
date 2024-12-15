document.getElementById('joinVipBtn').addEventListener('click', function () {
    const userConfirmed = confirm('您確定要成為 VIP 嗎？享受高品質觀影體驗！');
    
    if (userConfirmed) {
      // 設置用戶為VIP，並儲存到 localStorage
      localStorage.setItem('isVIP', 'true');
      
      // 顯示加入VIP成功的提示消息
      const vipSuccessMessage = document.getElementById('vipSuccessMessage');
      vipSuccessMessage.style.display = 'block';
      
      // 顯示 2 秒鐘後跳轉
      setTimeout(function() {
        alert('恭喜您已成功加入 VIP！開始享受專屬特權！');
        // 跳轉到無廣告頁面
        window.location.href = 'no-ads.html';  // 假設這是無廣告頁面的 URL
      }, 2000);  // 2秒後跳轉
    }
  });
  