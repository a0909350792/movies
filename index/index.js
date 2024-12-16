
// 示例電影數據庫
const onlineMovies = [
  { name: 'Spider-Man', img: src="index/1.png" ,score: 8.2, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Ringu', score: 5.5, img: src="index/2.png", numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Memories of Murder', score: 7.3, img: src="index/3.png",  numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'The Incredibles', score: 6.1, img: src="index/4.png",  numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Ratatouille', score: 9.0, img: src="index/5.png", numberOfRatings: Math.floor(Math.random() * 1000) + 1 }
];

const comingMovies = [
  { name: '唐山大地震', img: src="index/6.png" , score: 8.2, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Lightyear', img: src="index/7.png" , score: 5.5, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Tokyo Story', img: src="index/8.png" ,score: 7.3, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Paris, Je T Aime', img: src="index/9.png" , score: 6.1, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'The Wandering Earth 流浪地球', img: src="index/10.png" , score: 9.0, numberOfRatings: Math.floor(Math.random() * 1000) + 1 }
];

const classicMovies = [
  { name: '3 Idiots', img: src="index/11.png" , score: 8.2, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'The Little Mermaid',img: src="index/12.png" , score: 5.5, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: '你好，李煥英',img: src="index/13.png" , score: 7.3, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'Sholay',img: src="index/14.png" , score: 6.1, numberOfRatings: Math.floor(Math.random() * 1000) + 1 },
  { name: 'The Secret in Their Eyes',img: src="index/15.png" , score: 9.0, numberOfRatings: Math.floor(Math.random() * 1000) + 1 }
];

// 可以擴展更多類型的電影...


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

// 取得不同類型電影的函數
function getMoviesByCategory(category) {
  switch (category) {
    case 'online':
      return onlineMovies;
    case 'coming':
      return comingMovies;
    case 'classic':
      return classicMovies;
    default:
      return []; // 默認返回空數組
  }
}

// 動態生成電影項目的函數
function renderMovies(movies) {
  const moviesContainer = document.getElementById('movies'); // 找到電影容器
  moviesContainer.innerHTML = ''; // 清空容器內容

  movies.forEach((movie, index) => {
    const movieId = generateRandomId(); // 生成隨機的 data-id

    const movieItem = document.createElement('div');
    movieItem.className = 'movie-item';
    movieItem.setAttribute('data-id', movie.id); // 為每個電影項目加入唯一的 data-id
    movieItem.innerHTML = `
      <div class="poster">
        <img src="${movie.img}" alt="${movie.name}">
      </div>
      <div class="name">${movie.name}</div>
      <div class="score">評分：${movie.score}</div>
      <span class="heart" data-id="${movie.id}" data-selected="false">&#9825;</span>
    `;
    moviesContainer.appendChild(movieItem);
  });
}


// 切換篩選選項並更新電影列表
document.querySelector('.hamburger-dropdown').addEventListener('click', event => {
  const link = event.target.closest('a[data-category]');
  if (!link) return; // 確保點擊的是有效連結

  event.preventDefault(); // 阻止默認行為
  const category = link.getAttribute('data-category');

  // 切換選中狀態
  const filterItems = document.querySelectorAll('.hamburger-dropdown li');
  filterItems.forEach(item => item.classList.remove('selected'));
  link.closest('li').classList.add('selected');

  // 更新電影列表
  const movies = getMoviesByCategory(category);

  // 添加隱藏動畫
  const movieItems = document.querySelectorAll('.movie-item');
  movieItems.forEach(item => item.classList.add('hidden'));

  setTimeout(() => {
    renderMovies(movies); // 更新內容
    const newMovieItems = document.querySelectorAll('.movie-item');
    newMovieItems.forEach(item => item.classList.add('show'));
  }, 300); // 等待隱藏動畫結束後更新
});


// 延遲加載新內容並顯示不同電影
function delayedNavigation(event) {
  event.preventDefault(); // 阻止默認跳轉行為

  // 確保點擊的是導航鏈接
  if (event.target.tagName === 'A') {
    // 移除選中狀態
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => item.classList.remove('selected'));

    // 添加選中狀態
    event.target.classList.add('selected');
  }

  // 獲取電影容器
  const movieContainer = document.querySelector('.movies');

  // 動畫隱藏當前內容
  const movieItems = document.querySelectorAll('.movie-item');
  movieItems.forEach(item => {
    item.classList.add('hidden'); // 隱藏舊內容
  });

  // 根據點擊的導航鏈接獲取對應的電影類型
  const category = event.target.getAttribute('data-category'); // 假設導航鏈接有 data-category 屬性
  const newMovies = getMoviesByCategory(category);

  // 模擬加載新內容
  setTimeout(() => {
    // 生成新的電影列表內容
    const newContent = newMovies
      .map(
        movie =>{ // 計算顯示星星的分數
        // 先確保 score 是一個數字
      const score = parseFloat(movie.score) || 0; // 防止空值
      const totalStars = Math.round(score); // 取整數
      const Stars = Math.floor(score / 2); // 計算完整星數
      const halfStar = score % 1 !== 0 ? true : false; // 是否有半顆星
      const numberOfRatings = movie.numberOfRatings || Math.floor(Math.random() * 1000) + 1;
      // 創建星星
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
          if (i < totalStars) {
            starsHtml += '<span class="star full">&#9733;</span>'; // 完整星星
          } else if (halfStar && i === totalStars) {
            starsHtml += '<span class="star half">&#9733;</span>'; // 半顆星
          } else {
            starsHtml += '<span class="star empty">&#9733;</span>'; // 空心星星
          }
        }
          return `
      
      <div class="movie-item">
        <div class="poster">
          <a href="#">
            <img src="${movie.img}" alt="${movie.name} 的海報">
          </a>
        </div>
        
        <div class="name">
          <a href="#">${movie.name}</a>
          <span class="heart" data-selected="false">&#9825;</span>
        </div>

        <div class="score">
          <div class="rating" data-score="${score}" data-ratings="${numberOfRatings}">
            
          </div>
          <span class="rating-number">avgScore：${(score).toFixed(1)} (${numberOfRatings} 人評分)</span>
        </div>
      </div>`
      
    
     
      }
  )
      .join('');
      
// 確保將這段 HTML 更新到容器中
const contentArea = document.getElementById('movies');
contentArea.innerHTML = newContent;

    // 更新電影容器內容
    movieContainer.innerHTML = newContent;

    // 動畫顯示新內容
    const newItems = document.querySelectorAll('.movie-item');
    newItems.forEach(item => {
      item.classList.add('show'); // 顯示新內容
    });
  }, 300); // 設定過渡時間（300毫秒）
}

document.getElementById('favorites-link').addEventListener('click', (e) => {
  e.preventDefault();
  openFavoritesModal(); // 打開模態框
});


// 綁定事件
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', delayedNavigation); // 點擊導航鏈接時執行 `delayedNavigation` 函數
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
    "Better Days 少年的你", "The Crossing 太平輪",

    // 法國電影
    "Amélie", "La Haine", "The Intouchables", "Blue is the Warmest Color", "La Vie en Rose",
    "The Artist", "The Umbrellas of Cherbourg", "A Prophet", "Paris, Je T'Aime", "The Diving Bell and the Butterfly",

    // 印度電影
    "3 Idiots", "Lagaan", "Sholay", "Dilwale Dulhania Le Jayenge", "Dangal",
    "Kabhi Khushi Kabhie Gham", "PK", "Barfi!", "Zindagi Na Milegi Dobara", "Bahubali: The Beginning",

    // 韓國電影
    "Oldboy", "Parasite", "Train to Busan", "The Handmaiden", "The Wailing",
    "Memories of Murder", "Snowpiercer", "I Saw the Devil", "The Man from Nowhere", "Battles Without Honor and Humanity",

    // 西班牙電影
    "The Secret in Their Eyes", "Pan's Labyrinth", "The Skin I Live In", "Talk to Her", "The Orphanage",
    "Volver", "All About My Mother", "The Others", "Open Your Eyes", "Thesis",

    // 義大利電影
    "La Dolce Vita", "The Bicycle Thief", "Cinema Paradiso", "Life is Beautiful", "8½",
    "Il Postino", "The Great Beauty", "The Leopard", "Rocco and His Brothers", "The Consequences of Love",

    // 日本電影
    "Ringu", "Spirited Away", "Seven Samurai", "Battle Royale", "Akira Kurosawa's Dreams",
    "Your Name", "Tokyo Story", "Ikiru", "Princess Mononoke", "Rashomon"
];



  
  const movies = [];
  for (let i = 0; i < totalMovies; i++) {
      const randomName = movieNames[Math.floor(Math.random() * movieNames.length)];
      const score = Math.random() * 9.9;
      const roundedScore = Math.round(score * 10) / 10; // 四捨五入到一位小數
      const randomImg = `posters/${Math.floor(Math.random() * 30) + 1}.png`; // 圖片範圍 1.png ~ 30.png
      movies.push({ name: randomName,score: roundedScore, img: randomImg });
  }
  return movies;
}

// 生成 300 部隨機電影
const allMovies = generateRandomMovies(300);

// 分頁設置
let currentPage = 1; // 當前頁碼
const moviesPerPage = 30; // 每頁顯示電影數量
const totalPages = Math.ceil(allMovies.length / moviesPerPage); // 總頁數

let tempRating = null; // 初始化 tempRating 變數

function enableRating() {
  const ratingContainers = document.querySelectorAll('.rating');

  ratingContainers.forEach(ratingContainer => {
    const stars = ratingContainer.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('click', (event) => {
        const selectedValue = parseInt(event.target.getAttribute('data-value')); // 獲取點擊星星的值
        const totalRatings = parseInt(ratingContainer.getAttribute('data-ratings')) || 0 ; // 當前評分人數
        const currentScore = parseFloat(ratingContainer.getAttribute('data-score')) || 0; // 當前平均分數

        // 計算新的平均分數
        const newScore = ((currentScore * totalRatings) + selectedValue) / (totalRatings + 1);
        const newRatings = totalRatings + 1;

        // 更新數據屬性
        ratingContainer.setAttribute('data-score', newScore.toFixed(1));
        ratingContainer.setAttribute('data-ratings', newRatings);

        // 更新分數顯示
        const scoreDisplay = ratingContainer.nextElementSibling;
        if (scoreDisplay) {
          scoreDisplay.textContent = `avgScore：${newScore.toFixed(1)} (${newRatings} 人評分)`;
        }

        // 更新星星顯示
        updateStars(ratingContainer, selectedValue);
      });
    });
  });
}

// 更新星星顯示
function updateStars(ratingContainer, selectedValue) {
  const stars = ratingContainer.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < selectedValue) {
      star.classList.add('full');
      star.classList.remove('empty');
    } else {
      star.classList.add('empty');
      star.classList.remove('full');
    }
  });
}

// 初始化評分功能
document.addEventListener('DOMContentLoaded', () => {
  enableRating();
});




// 更新內容函數

function updateContent() {
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = currentPage * moviesPerPage;
  const moviesToDisplay = allMovies.slice(startIndex, endIndex);

  const movieListContainer = document.querySelector('.movies');
  movieListContainer.innerHTML = ''; // 清空當前顯示的內容

  // 用來追蹤已顯示過的圖片
  const displayedImages = new Set();

  // 篩選出未顯示過的電影
  const remainingMovies = allMovies.filter(movie => !displayedImages.has(movie.img));

  // 確保每一頁都有不重複的圖片
  let movieIndex = 0;

  moviesToDisplay.forEach((movie) => {
    // 如果這部電影的圖片已經顯示過，從剩餘的未顯示過的圖片中選擇
    if (displayedImages.has(movie.img)) {
      // 選擇未顯示過的電影
      const newMovie = remainingMovies[movieIndex];

      // 使用新的圖片替換原來的電影圖片
      movie.img = newMovie.img;
      movie.name = newMovie.name;
      movie.numberOfRatings = newMovie.numberOfRatings;

      // 更新剩餘電影數組和顯示過的圖片集合
      remainingMovies.splice(movieIndex, 1);  // 移除已使用的電影
    }

    // 隨機生成分數（精確到 0.1），範圍為 0 到 10 分
    const score = Math.random() * 9.9;
    const roundedScore = Math.round(score * 10) / 10; // 四捨五入到一位小數
    const totalStars = Math.floor(roundedScore / 2); // 每顆星 = 2 分
    const halfStar = roundedScore % 2 >= 1; // 判斷是否需要半顆星
    const numberOfRatings = movie.numberOfRatings || Math.floor(Math.random() * 1000) + 1;

    // 生成星星的 HTML
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < totalStars) {
        starsHtml += '<span class="star full" data-value="' + (i + 1) + '">&#9733;</span>';
      } else if (halfStar && i === totalStars) {
        starsHtml += '<span class="star half" data-value="' + (i + 1) + '">&#9733;</span>';
      } else {
        starsHtml += '<span class="star empty" data-value="' + (i + 1) + '">&#9733;</span>';
      }
    }

    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
    
        <div class="poster">
        
          <a href="#">
            <img src="${movie.img}" alt="${movie.name} 的海報">
          </a>
        </div>
        
        <div class="name">
          <a href="#">${movie.name}</a>
          <span class="heart" data-selected="false">&#9825;</span>
        </div>

        <div class="score">
          <div class="rating" data-score="${score}" data-ratings="${numberOfRatings}">
            ${starsHtml}
          </div>
          <span class="rating-number">avgScore：${(score).toFixed(1)} (${numberOfRatings} 人評分)</span>
        </div>
    `;
    movieListContainer.appendChild(movieItem);

    // 將當前圖片加入到已顯示的圖片集合中
    displayedImages.add(movie.img);
  });

  // 啟用評分功能
  enableRating();
}




// 默認排序規則
let currentSort = 'popular'; // 當前排序規則




// 排序函數
function sortMovies(criteria) {
  if (criteria === 'score') {
    // 按照平均分數從高到低排序
    allMovies.sort((a, b) => {
      const scoreA = parseFloat(a.score) || 0; // 確保是數字，若為空或無效則預設為 0
      const scoreB = parseFloat(b.score) || 0; // 同上
      return scoreB - scoreA; // 按照平均分數降序排序
    });
  } else if (criteria === 'time') {
    // 按字母順序排序（電影名稱的字母順序）
    allMovies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === 'popular') {
    // 按評分人數從多到少排序
    allMovies.sort((a, b) => {
      const ratingsA = parseInt(a.numberOfRatings) || 0; // 確保是數字，若為空或無效則預設為 0
      const ratingsB = parseInt(b.numberOfRatings) || 0; // 同上
      return ratingsB - ratingsA; // 按評分人數降序排序
    });
  }
  updateContent(); // 排序後重新更新內容
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


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const thumbnails = document.querySelectorAll('.carousel-thumbnails img');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');

  let currentIndex = 0;
  const totalSlides = slides.length;
  const autoSlideInterval = 3000; // 自動輪播時間
  let autoSlideTimer;

  // 更新輪播狀態
  function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      thumbnails.forEach((thumb, index) => {
          thumb.classList.toggle('active', index === currentIndex);
      });
  }

  // 上一張
  function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
      resetAutoSlide();
  }

  // 下一張
  function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
      resetAutoSlide();
  }

  // 縮圖點擊事件
  thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
          resetAutoSlide();
      });
  });

  // 自動輪播
  function startAutoSlide() {
      autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
  }

  // 重置自動輪播
  function resetAutoSlide() {
      clearInterval(autoSlideTimer);
      startAutoSlide();
  }

  // 按鈕綁定事件
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // 初始化
  updateCarousel();
  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".hamburger-dropdown");

  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    dropdown.classList.toggle("show");
  });

  // 點擊頁面其他地方時關閉清單
  window.addEventListener("click", (e) => {
    if (!hamburgerMenu.contains(e.target) && !dropdown.contains(e.target)) {
      hamburgerMenu.classList.remove("active");
      dropdown.classList.remove("show");
    }
  });
});


// 收藏夾數組，保存已收藏的電影
let favorites = [];

// 獲取收藏按鈕和模態框
const favoriteButtons = document.querySelectorAll('.favorite-things');
const modal = document.getElementById("favorites-modal");
const closeModal = document.querySelector(".close");
const favoritesList = document.getElementById("favorites-list");

// 打開收藏夾模態框
function openFavoritesModal() {
  if (favorites.length === 0) {  // 如果沒有收藏
    favoritesList.innerHTML = "<p>尚未添加任何收藏。</p>";
  } else {
    favoritesList.innerHTML = favorites
      .map(favorite => `
        <div class="favorite-item" data-id="${favorite.id}">
          <p>
            <img src="${favorite.img}" alt="${favorite.name}" width="50">
            ${favorite.name}
            <button class="remove-favorite" data-id="${favorite.id}">移除</button>
          </p>
        </div>
      `)
      .join('');
    
    // 添加清空收藏夾的按鈕
    favoritesList.innerHTML += `
      <button id="clear-favorites" class="clear-favorites">清空收藏夾</button>
    `;
  }

  modal.style.display = "block";

  // 綁定移除按鈕的點擊事件
  const removeButtons = document.querySelectorAll('.remove-favorite');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFavorite);
  });

  // 綁定清空收藏夾按鈕的點擊事件
  const clearButton = document.getElementById("clear-favorites");
  if (clearButton) {
    clearButton.addEventListener('click', clearFavorites);
  }
  modal.style.display = "flex"; // 確保模態框顯示並設置彈性佈局
}

// 關閉收藏夾模態框
closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// 當用戶點擊模態框外部時關閉模態框
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 模擬添加電影到收藏夾
document.querySelector('.favorite-things').addEventListener('click', (e) => {

  

  openFavoritesModal();  // 更新收藏夾界面
});


function removeFavorite(e) {
  const movieId = e.target.getAttribute('data-id'); // 獲取隨機生成的 data-id
  
  if (!movieId) {
    console.error('無法找到目標的 data-id，請檢查 HTML 結構。');
    return;
  }

  // 從收藏清單中移除該電影
  favorites = favorites.filter(movie => movie.id !== movieId);

  alert("已移除該收藏！");

  // 刷新收藏夾內容
  openFavoritesModal();

  // 更新對應的心形按鈕為空心

  const heart = document.querySelector(`.heart[data-id="${movieId}"]`);
  if (heart) {
    heart.setAttribute('data-selected', 'false');
    heart.innerHTML = '&#9825;'; // 空心心形
  }
}




// 清空收藏夾功能
function clearFavorites() {
  favorites.length = 0; // 清空收藏夾數組
  openFavoritesModal(); // 更新收藏夾模態框內容
  // 將所有心形按鈕設為空心
 document.querySelectorAll('.heart[data-selected="true"]').forEach(heart => {
  heart.setAttribute('data-selected', 'false');
  heart.innerHTML = '&#9825;'; // 空心心形
});


  alert("收藏夾已清空！");


}

function generateRandomId() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + Date.now();
}


// 收藏夾數組
let favoritesMovies = [];

// 監聽所有心形按鈕的點擊事件
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('heart')) {
    const heart = e.target;
    // const movieId = generateRandomId(); // 生成隨機的 data-id
    const movieId = generateRandomId();
    // const movieId = heart.closest('.movie-item').getAttribute('data-id'); // 獲取電影 ID
    const movieName = heart.closest('.movie-item').querySelector('.name a').textContent;
    const movieImg = heart.closest('.movie-item').querySelector('.poster img').src;
    if (heart.getAttribute('data-selected') === 'false') {
      // 添加到收藏
      heart.setAttribute('data-selected', 'true');
      heart.innerHTML = '&#9829;'; // 實心心形
      favorites.push({ id: movieId, name: movieName, img: movieImg }); // 添加到收藏列表
      openFavoritesModal(); // 更新收藏夾模態框內容
      alert(`${movieName} 已添加到收藏夾！`);
    } else {
      // 從收藏移除
      heart.setAttribute('data-selected', 'false');
      heart.innerHTML = '&#9825;'; // 空心心形
      favorites = favorites.filter(movie => movie.id !== movieId); // 從收藏夾移除
      openFavoritesModal(); // 更新收藏夾模態框內容
      alert(`${movieName} 已從收藏夾移除！`);
    }

    console.log('收藏夾內容：', favorites); // 調試用
  }
});

  

// 獲取頁面中的超連結和漢堡選單中的對應項目
const nowShowingBtn = document.getElementById('nowShowingBtn');
const comingSoonBtn = document.getElementById('comingSoonBtn');
const classicMoviesBtn = document.getElementById('classicMoviesBtn');

const nowShowingMenu = document.getElementById('nowShowingMenu');
const comingSoonMenu = document.getElementById('comingSoonMenu');
const classicMoviesMenu = document.getElementById('classicMoviesMenu');

// 點擊切換功能
function handleClick(clickedBtn, clickedMenu) {
    // 移除所有超連結和菜單項目的 'active' 類
    nowShowingBtn.classList.remove('active');
    comingSoonBtn.classList.remove('active');
    classicMoviesBtn.classList.remove('active');
    
    nowShowingMenu.classList.remove('active');
    comingSoonMenu.classList.remove('active');
    classicMoviesMenu.classList.remove('active');
    
    // 為點擊的超連結和對應的漢堡選單項目添加 'active' 類
    clickedBtn.classList.add('active');
    clickedMenu.classList.add('active');
}

// 為每個超連結和漢堡選單項目添加點擊事件
nowShowingBtn.addEventListener('click', () => handleClick(nowShowingBtn, nowShowingMenu));
comingSoonBtn.addEventListener('click', () => handleClick(comingSoonBtn, comingSoonMenu));
classicMoviesBtn.addEventListener('click', () => handleClick(classicMoviesBtn, classicMoviesMenu));

nowShowingMenu.addEventListener('click', () => handleClick(nowShowingBtn, nowShowingMenu));
comingSoonMenu.addEventListener('click', () => handleClick(comingSoonBtn, comingSoonMenu));
classicMoviesMenu.addEventListener('click', () => handleClick(classicMoviesBtn, classicMoviesMenu));

