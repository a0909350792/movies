// 切換選中的導航項目並添加動畫
function switchNav(event) {
  const href = event.target.getAttribute('href'); // 取得目標 URL

  // 確保 href 存在
  if (href) {
      event.preventDefault(); // 阻止默認跳轉行為

      // 移除所有選中狀態
      const navItems = document.querySelectorAll('.nav a');
      navItems.forEach(item => item.classList.remove('selected'));

      // 添加選中狀態
      event.target.classList.add('selected');
      
      // 加入隱藏動畫
      const container = document.querySelector('.container');
      container.classList.add('hidden');

      // 等待動畫結束後跳轉
      setTimeout(() => {
          window.location.href = href; // 強制跳轉
      }, 100 ); // 與 CSS 動畫時間一致
  }
}

// 更新內容函數（示例）
function updateContent() {
  // 這裡可以根據導航選項切換不同的內容或電影列表
  console.log("更新內容...");
  // 例如，從 API 獲取新數據或切換篩選條目等
}

// 切換篩選選項的動畫
function switchFilter(event) {
  event.preventDefault();

  // 移除選中狀態
  const filterItems = event.target.closest('ul').querySelectorAll('li');
  filterItems.forEach(item => item.classList.remove('selected'));

  // 添加選中狀態
  event.target.closest('li').classList.add('selected');
  
  // 動畫：電影項目隱藏並重現
  const movieItems = document.querySelectorAll('.movie-item');
  
  movieItems.forEach(item => {
      item.classList.add('hidden');
  });

  // 等待動畫結束後更新內容
  setTimeout(() => {
      // 更新電影列表的邏輯
      console.log("更新電影列表...");
      
      // 顯示所有電影項目並添加動畫效果
      movieItems.forEach(item => {
          item.classList.remove('hidden');
          item.classList.add('show');
      });
  }, 300); // 300ms 隱藏動畫時間
}

// 初始化事件監聽器
document.addEventListener('DOMContentLoaded', () => {
  // 監聽導航項目的點擊事件
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          switchNav(e);
      });
  });

  // 監聽篩選選項的點擊事件
  const filterLinks = document.querySelectorAll('.choose-item ul li a');
  filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          switchFilter(e);
      });
  });
});

// 隨機生成電影數據函數
function generateRandomMovies(totalMovies) {
  const movieNames = [
    // 英文電影
    "Inception", "Interstellar", "The Dark Knight", "Avatar", "Titanic",
    "The Matrix", "Pulp Fiction", "The Godfather", "Shrek", "Avengers",
    "Frozen", "Spider-Man", "Iron Man", "Black Panther", "Joker",
    "The Lion King", "Toy Story", "Finding Nemo", "Coco", "Up",
    "Aladdin", "The Little Mermaid", "Beauty and the Beast", "Mulan", "Zootopia",
    "Moana", "Encanto", "WALL-E", "Ratatouille", "Monsters, Inc.",
    "The Incredibles", "Soul", "Turning Red", "Lightyear", "Inside Out",

    // 中文電影
    "無間道", "英雄", "霸王別姬", "讓子彈飛", "唐人街探案",
    "戰狼", "紅海行動", "哪吒之魔童降世", "流浪地球", "功夫",
    "大話西遊", "喜劇之王", "少林足球", "美人魚", "一秒鐘",
    "我不是藥神", "你好，李煥英", "西遊記之大鬧天宮", "唐山大地震", "刺客聶隱娘",

    // 中英混合
    "Crouching Tiger, Hidden Dragon 卧虎藏龙", "The Grandmaster 一代宗師",
    "Farewell My Concubine 霸王别姬", "Shadow 影", "Hero 英雄",
    "Lust, Caution 色，戒", "The Wandering Earth 流浪地球", "Ip Man 葉問",
    "Better Days 少年的你", "The Crossing 太平輪"]


  
  const movies = [];
  for (let i = 0; i < totalMovies; i++) {
      const randomName = movieNames[Math.floor(Math.random() * movieNames.length)];
      const randomScore = (Math.random() * 3 + 7).toFixed(1); // 隨機評分：7.0 ~ 10.0
      const randomImg = `https://via.placeholder.com/160x220?text=${encodeURIComponent(randomName)}`;
      movies.push({ name: randomName, score: randomScore, img: randomImg });
  }
  return movies;
}

// 生成 350 部隨機電影
const allMovies = generateRandomMovies(350);

// 分頁設置
let currentPage = 1; // 當前頁碼
const moviesPerPage = 35; // 每頁顯示電影數量
const totalPages = Math.ceil(allMovies.length / moviesPerPage); // 總頁數

// 更新內容函數
function updateContent() {
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = currentPage * moviesPerPage;
  const moviesToDisplay = allMovies.slice(startIndex, endIndex);

  const movieListContainer = document.querySelector('.movies');
  movieListContainer.innerHTML = ''; // 清空當前顯示的內容

  moviesToDisplay.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');
      movieItem.innerHTML = `
          <div class="poster"><a href="#"><img src="${movie.img}" alt="${movie.name} 的海報"></a></div>
          <div class="name"><a href="#">${movie.name}</a></div>
          <div class="score">${movie.score}</div>
      `;
      movieListContainer.appendChild(movieItem);
  });
}

// 默認排序規則
let currentSort = 'popular'; // 當前排序規則



// 排序函數
function sortMovies(criteria) {
  if (criteria === 'score') {
      // 按評分從高到低排序
      allMovies.sort((a, b) => b.score - a.score);
  } else if (criteria === 'time') {
      // 按字母順序排序（電影名稱的字母順序）
      allMovies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === 'popular') {
      // 模擬按熱門排序（隨機排序）
      allMovies.sort(() => Math.random() - 0.5);
  }
}

// 監聽排序選擇
document.querySelectorAll('.select input[type="radio"]').forEach((radio) => {
  radio.addEventListener('change', (event) => {
      currentSort = event.target.value; // 獲取選中的排序規則
      sortMovies(currentSort); // 根據排序規則進行排序
      currentPage = 1; // 重置到第一頁
      updateContent(); // 更新顯示內容
  });
});

// 初始化內容顯示
updateContent();


// 監聽排序選擇
document.querySelector('.select').addEventListener('change', (event) => {
  currentSort = event.target.value; // 獲取選中的排序規則
  sortMovies(currentSort); // 根據排序規則排序
  currentPage = 1; // 重置到第一頁
  updateContent(); // 更新內容
});

// 更新分頁器的狀態
function updatePager() {
  // 更新頁碼的選中狀態
  const pagerItems = document.querySelectorAll('.pager .page-number');
  pagerItems.forEach(item => item.classList.remove('selected'));
  
  const selectedPageItem = document.querySelector(`.pager .page-number[data-page="${currentPage}"]`);
  if (selectedPageItem) {
      selectedPageItem.classList.add('selected');
  }

  // 控制 "上一頁" 和 "下一頁" 按鈕的狀態
  const prevBtn = document.querySelector('.pager .prev');
  const nextBtn = document.querySelector('.pager .next');

  if (currentPage === 1) {
      prevBtn.classList.add('disabled');
  } else {
      prevBtn.classList.remove('disabled');
  }

  if (currentPage === totalPages) {
      nextBtn.classList.add('disabled');
  } else {
      nextBtn.classList.remove('disabled');
  }
}

// 切換到上一頁
function prevPage() {
  if (currentPage > 1) {
      currentPage--;
      switchPage();
  }
}

// 切換到下一頁
function nextPage() {
  if (currentPage < totalPages) {
      currentPage++;
      switchPage();
  }
}

// 點擊頁碼按鈕時跳轉到指定頁
function goToPage(pageNumber) {
  currentPage = pageNumber;
  switchPage();
}

// 切換頁面時更新內容和分頁器
function switchPage() {
  updateContent();  // 更新內容
  updatePager();    // 更新分頁器（頁碼、按鈕狀態）
}

// 綁定事件
document.querySelector('.pager .prev').addEventListener('click', function(event) {
  event.preventDefault();
  prevPage();
});

document.querySelector('.pager .next').addEventListener('click', function(event) {
  event.preventDefault();
  nextPage();
});

// 為每個頁碼按鈕添加點擊事件
document.querySelectorAll('.pager .page-number').forEach(item => {
  item.addEventListener('click', function(event) {
      event.preventDefault();
      const pageNumber = parseInt(event.target.getAttribute('data-page'));
      goToPage(pageNumber);
  });
});

// 初始化頁面
updateContent();  // 顯示初始頁的內容
updatePager();    // 更新頁碼的選中狀態

document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('backToTop');

  // 當滾動時檢查頁面高度
  window.addEventListener('scroll', () => {
      if (window.scrollY > 200) { // 如果滾動超過 200px，顯示按鈕
          backToTopBtn.classList.add('show');
      } else {
          backToTopBtn.classList.remove('show');
      }
  });

  // 點擊按鈕時回到頁頭
  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth' // 平滑滾動
      });
  });
});
