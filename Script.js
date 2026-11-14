‎// بيانات الأماكن السياحية في حائل
const places = [
  {
    id: 1,
    name: "قلعة أعيرف",
    category: "historic",
    description: "قلعة تاريخية تقع على قمة جبل في وسط مدينة حائل.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/%D9%82%D9%84%D8%B9%D8%A9-%D8%A3%D8%B9%D9%8A%D8%B1%D9%81-2.jpg",
    duration: 1,
    budget: "low"
  },
  {
    id: 2,
    name: "قصر القشلة",
    category: "historic",
    description: "أحد أبرز المعالم التاريخية التي تعكس العمارة النجدية.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/%D8%AA%D9%86%D8%B2%D9%8A%D9%84-1.jpg",
    duration: 1,
    budget: "low"
  },
  {
    id: 3,
    name: "جبة وجبل أم سنمان",
    category: "culture",
    description: "موقع تراث عالمي يشتهر بالنقوش والرسوم الصخرية القديمة.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/000-1709792761508054078440.jpg",
    duration: 3,
    budget: "medium"
  },
  {
    id: 4,
    name: "النقوش الصخرية في الشويمس",
    category: "culture",
    description: "منطقة أثرية تضم رسوماً ونقوشاً صخرية تعود إلى عصور قديمة.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/DST_1719934_3205158_70_7_2022041122050795.jpg",
    duration: 4,
    budget: "medium"
  },
  {
    id: 5,
    name: "جبل ياطب",
    category: "culture",
    description: "يشتهر بالنقوش والكتابات الصخرية والرسوم القديمة.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/1000_fced611d40.jpg",
    duration: 2,
    budget: "low"
  },
  {
    id: 6,
    name: "مدينة فيد التاريخية",
    category: "historic",
    description: "موقع تاريخي يضم بقايا مبانٍ وآبار ومنشآت أثرية.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D9%81%D9%8A%D8%AF-%D8%A8%D8%AD%D8%A7%D8%A6%D9%84.png",
    duration: 3,
    budget: "medium"
  },
  {
    id: 7,
    name: "الحائط التاريخية",
    category: "historic",
    description: "بلدة تاريخية تضم مباني قديمة وبيوتاً تراثية ونقوشاً.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/000-1521171071548240887774.jpg",
    duration: 2,
    budget: "low"
  },
  {
    id: 8,
    name: "أبراج برزان",
    category: "culture",
    description: "من المعالم التاريخية المرتبطة بتراث مدينة حائل.",
    image: "https://htda.org.sa/wp-content/uploads/2022/10/Tourist-places-in-Hail-10-640x410-1.jpg",
    duration: 1,
    budget: "low"
  },
  {
    id: 9,
    name: "جبال أجا",
    category: "nature",
    description: "وجهة طبيعية مميزة لمحبي الجبال والاستكشاف والمغامرات.",
    image: "https://portalcdn.spa.gov.sa/backend/original/202504/nCLSyqaoEdhQCweYK0qtK6sQTAJSNNw54eeLuKUU.jpg",
    duration: 3,
    budget: "medium"
  },
  {
    id: 10,
    name: "جبال سلمى",
    category: "nature",
    description: "مناظر جبلية طبيعية مناسبة لمحبي الطبيعة والرحلات.",
    image: "https://saudipedia.com/saudipedia/uploads/images/2023/07/22/59782.jpg",
    duration: 3,
    budget: "medium"
  }
];

// قراءة المفضلة المحفوظة
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("hail360Favorites")) || [];
  } catch (error) {
    return [];
  }
}

// عرض الأماكن
function displayPlaces() {
  const container = document.getElementById("placesContainer");

  const searchText = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  const category = document.getElementById("categoryFilter").value;

  const filteredPlaces = places.filter(place => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchText) ||
      place.description.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "all" || place.category === category;

    return matchesSearch && matchesCategory;
  });

  if (filteredPlaces.length === 0) {
    container.innerHTML =
      '<p class="empty-message">لم يتم العثور على أماكن مطابقة للبحث.</p>';
    return;
  }

  container.innerHTML = filteredPlaces
    .map(place => createPlaceCard(place))
    .join("");
}

// إنشاء بطاقة المكان
function createPlaceCard(place) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(place.id);

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(place.name + " حائل السعودية");

  return `
    <article class="place-card">
      <img
        src="${place.image}"
        alt="${place.name}"
        loading="lazy"
        onerror="this.style.display='none'"
      >

      <div class="place-info">
        <h3>${place.name}</h3>
        <p>${place.description}</p>

        <div class="place-actions">
          <a
            href="${mapUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="map-link"
          >
            عرض على الخريطة ↗
          </a>

          <button
            class="favorite-btn"
            onclick="toggleFavorite(${place.id})"
          >
            ${isFavorite ? "♥ مضاف للمفضلة" : "♡ أضف للمفضلة"}
          </button>
        </div>
      </div>
    </article>
  `;
}

// إضافة أو إزالة مكان من المفضلة
function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(
    "hail360Favorites",
    JSON.stringify(favorites)
  );

  displayPlaces();
  displayFavorites();
}

// عرض المفضلة
function displayFavorites() {
  const container = document.getElementById("favoritesContainer");
  const favorites = getFavorites();

  const favoritePlaces = places.filter(place =>
    favorites.includes(place.id)
  );

  if (favoritePlaces.length === 0) {
    container.innerHTML =
      '<p class="empty-message">لم تضف أي أماكن إلى المفضلة حتى الآن.</p>';
    return;
  }

  container.innerHTML = favoritePlaces
    .map(place => createPlaceCard(place))
    .join("");
}

// اقتراح برنامج رحلة تجريبي
function generateTrip() {
  const interest = document.getElementById("interest").value;
  const budget = document.getElementById("budget").value;
  const duration = Number(document.getElementById("duration").value);

  const result = document.getElementById("tripResult");

  // اختيار الأماكن حسب الاهتمام والميزانية والوقت
  let suitablePlaces = places.filter(place => {
    const matchesInterest =
      interest === "all" || place.category === interest;

    const matchesBudget =
      budget === "high" ||
      place.budget === "low" ||
      (budget === "medium" && place.budget === "medium");

    return matchesInterest && matchesBudget;
  });

  // ترتيب الأماكن
  suitablePlaces.sort((a, b) => a.duration - b.duration);

  // اختيار الأماكن التي تناسب الوقت المتاح
  let selectedPlaces = [];
  let totalDuration = 0;

  for (const place of suitablePlaces) {
    if (totalDuration + place.duration <= duration) {
      selectedPlaces.push(place);
      totalDuration += place.duration;
    }
  }

  if (selectedPlaces.length === 0) {
    result.innerHTML = `
      <h3>لم نجد رحلة مناسبة</h3>
      <p>جرب تغيير الاهتمامات أو زيادة الوقت المتاح.</p>
    `;
    return;
  }

  const tripItems = selectedPlaces.map((place, index) => {
    const mapUrl =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(place.name + " حائل السعودية");

    return `
      <li>
        <strong>${index + 1}. ${place.name}</strong>
        — ${place.duration} ساعات تقريباً
        <br>
        <a href="${mapUrl}" target="_blank" rel="noopener noreferrer">
          افتح الموقع على الخريطة
        </a>
      </li>
    `;
  }).join("");

  result.innerHTML = `
    <h3>اقتراح رحلتك في حائل</h3>
    <p>هذه الأماكن المقترحة بناءً على اختياراتك:</p>
    <ol>${tripItems}</ol>
    <p><strong>إجمالي الوقت التقديري:</strong> ${totalDuration} ساعات</p>
    <p class="planner-note">
      هذا اقتراح تجريبي يعتمد على قواعد برمجية،
      وليس نظام ذكاء اصطناعي متصلاً بخدمة خارجية.
      الأوقات تقديرية ولا تشمل التنقل بين المواقع.
    </p>
  `;
}

// قائمة التنقل للجوال
function toggleMenu() {
  document.querySelector(".navbar nav").classList.toggle("show");
}

// تشغيل الوظائف عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function() {
  displayPlaces();
  displayFavorites();
});
