const cityNameMap = {
    "Hakodate": "北海道 函館",
    "Aomori Shi": "青森県 青森市",
    "Kamaishi": "岩手県 釜石市",
    "Watari": "宮城県 亘理市",
    "Akita": "秋田県 秋田市", 
    "Yamagata": "山形県 山形市",
    "Fukushima": "福島県 福島市",
    "Ibaraki": "茨城県",
    "Tochigi": "栃木県",
    "Takasaki": "群馬県 高崎市",
    "Saitama": "埼玉県",
    "Chiba": "千葉県",
    "Tokyo": "東京都",
    "Fujisawa": "神奈川県 藤沢市",
    "Niigata": "新潟県 新潟市",
    "Toyama": "富山県 富山市",
    "Ishikawa": "石川県",
    "Fukui": "福井県 福井市",
    "Ryuo": "山梨県 竜王町",
    "Nagano": "長野県 長野市",
    "Gifu": "岐阜県 岐阜市",
    "Shizuoka-Shi": "静岡県 静岡市",
    "Toyota": "愛知県 豊田市",
    "Yokkaichi": "三重県",
    "Moriyama": "滋賀県 守山市",
    "Kyoto": "京都府",
    "Osaka-Shi": "大阪府",
    "Hyogo": "兵庫県",
    "Nara-Shi": "奈良県 奈良市",
    "Wakayama-Shi": "和歌山県 和歌山市",
    "Tottori": "鳥取県",
    "Masuda": "島根県 益田市",
    "Okayama": "岡山県",
    "Hiroshima-Shi": "広島県 広島市",
    "Yamaguchi-Shi": "山口県 山口市",
    "Tokushima-Shi": "徳島県 徳島市",
    "Kagawasan": "香川県",
    "Hojo": "愛媛県 北条市",
    "Kochi": "高知県",
    "Fukuoka-Shi": "福岡県 福岡市",
    "Saga-Shi": "佐賀県 佐賀市",
    "Nagasaki-Shi": "長崎県 長崎市",
    "Kumamoto": "熊本県",
    "Oita": "大分県",
    "Miyazaki-Shi": "宮崎県",
    "Kagoshima-Shi": "鹿児島県 鹿児島市",
    "Okinawa": "沖縄県"
};

const MAX_HISTORY = 5; //[cite: 1, 2]

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("city").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });
    renderHistory();
});

// 天気の状態に応じたクラスを正確に返す関数
function getWeatherThemeClass(conditionText) {
    const text = conditionText ? conditionText.toLowerCase() : "";

    if (text.includes("晴") || text.includes("快晴") || text.includes("sunny") || text.includes("clear")) {
        return "weather-sunny";
    } 
    if (text.includes("雨") || text.includes("rain") || text.includes("drizzle") || text.includes("しぐれ") || text.includes("シャワー")) {
        return "weather-rainy";
    } 
    if (text.includes("雪") || text.includes("snow") || text.includes("みぞれ") || text.includes("sleet")) {
        return "weather-snowy";
    } 
    if (text.includes("雷") || text.includes("thunder")) {
        return "weather-thunder";
    } 
    if (text.includes("曇") || text.includes("くもり") || text.includes("雲") || text.includes("cloud") || text.includes("overcast") || text.includes("霧") || text.includes("mist") || text.includes("fog")) {
        return "weather-cloudy";
    }
    return "weather-default";
}

function getHistory() {
    return JSON.parse(localStorage.getItem("weather_history") || "[]");
}

function saveHistory(city, displayName) {
    let history = getHistory();
    history = history.filter(item => item.city.toLowerCase() !== city.toLowerCase());
    history.unshift({ city: city, name: displayName });
    
    if (history.length > MAX_HISTORY) {
        history.pop(); //[cite: 1, 2]
    }

    localStorage.setItem("weather_history", JSON.stringify(history));
    renderHistory();
}

function clearHistory() {
    localStorage.removeItem("weather_history");
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    const historySection = document.getElementById("history-section");
    const historyList = document.getElementById("history-list");

    if (history.length === 0) {
        historySection.style.display = "none";
        return;
    }

    historySection.style.display = "block";
    historyList.innerHTML = "";

    history.forEach(item => {
        const chip = document.createElement("div");
        chip.className = "history-chip";
        chip.textContent = item.name;
        chip.onclick = () => {
            document.getElementById("city").value = item.city;
            getWeather(item.city);
        };
        historyList.appendChild(chip);
    });
}

function resetAll() {
    const cityInput = document.getElementById("city");
    const weatherDiv = document.getElementById("weather");
    const resetBtn = document.getElementById("reset-btn");

    cityInput.value = "";
    weatherDiv.innerHTML = "";
    weatherDiv.className = "";
    weatherDiv.style.display = "none";
    resetBtn.style.display = "none";
}

async function getWeather(targetCity = null) {
    const API_KEY = "183fe24ae5864aff98e44856250407";
    const cityInput = document.getElementById("city");
    const searchBtn = document.getElementById("search-btn");
    const resetBtn = document.getElementById("reset-btn");
    const weatherDiv = document.getElementById("weather");

    const city = targetCity || cityInput.value.trim();

    resetBtn.style.display = "inline-block";
    weatherDiv.style.display = "block";

    if (!city) {
        weatherDiv.className = "plain-card";
        weatherDiv.innerHTML = `<p class="error-message">都市名を入力してください（例: Tokyo）</p>`;
        return;
    }

    // ローディング中
    weatherDiv.className = "plain-card";
    searchBtn.disabled = true;
    searchBtn.textContent = "取得中...";
    weatherDiv.innerHTML = `<p style="color: #666; margin: 0;">天気を取得しています...</p>`;

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ja`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("指定された都市が見つかりませんでした。<br>英語表記または「都市名, Japan」でお試しください。");
        }

        const data = await response.json();
        const englishName = data.location.name;
        const japaneseName = cityNameMap[englishName] || englishName; 

        saveHistory(city, japaneseName);

        // 既存のクラスをリセットしてから、新しいテーマクラスを確実に付与
        weatherDiv.className = "";
        const themeClass = getWeatherThemeClass(data.current.condition.text);
        weatherDiv.classList.add(themeClass);

        weatherDiv.innerHTML = `
            <h2>${japaneseName}</h2>
            <div class="icon-container">
                <img src="${data.current.condition.icon}" alt="天気アイコン" />
            </div>
            <div class="temp">${data.current.temp_c}℃</div>
            <div class="condition">${data.current.condition.text}</div>
            <div class="weather-details">
                <div class="detail-badge">💧 湿度: <strong>${data.current.humidity}%</strong></div>
                <div class="detail-badge">💨 風速: <strong>${data.current.wind_kph} km/h</strong></div>
            </div>
        `;

        cityInput.value = "";

    } catch (error) {
        weatherDiv.className = "plain-card";
        weatherDiv.innerHTML = `<p class="error-message">${error.message}</p>`;
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "天気を取得";
    }
}