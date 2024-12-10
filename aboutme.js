
        // 滾動時顯示效果
        window.addEventListener('scroll', function() {
            const aboutSection = document.querySelector('.about');
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
    
            if (aboutPosition < screenHeight) {
                aboutSection.classList.add('show');
            }
        });
    
        // 顯示更多資訊的功能
        function toggleMoreInfo() {
            const moreInfo = document.getElementById('more-info');
            const button = document.getElementById('show-more');
    
            if (moreInfo.classList.contains('hidden')) {
                moreInfo.classList.remove('hidden');
                button.textContent = '收起資訊';
            } else {
                moreInfo.classList.add('hidden');
                button.textContent = '查看更多資訊';
            }
        }
    