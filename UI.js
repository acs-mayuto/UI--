// 日本全国の都道府県名（日本語・ひらがな・ローマ字）を正確な英語クエリに変換するマップ
const searchCorrectionMap = {
    // 北海道・東北
    "北海道": "Hokkaido, Japan", "ほっかいどう": "Hokkaido, Japan", "hokkaido": "Hokkaido, Japan",
    "青森": "Aomori, Japan", "青森県": "Aomori, Japan", "あおもり": "Aomori, Japan", "aomori": "Aomori, Japan",
    "岩手": "Iwate, Japan", "岩手県": "Iwate, Japan", "いわて": "Iwate, Japan", "iwate": "Iwate, Japan",
    "宮城": "Miyagi, Japan", "宮城県": "Miyagi, Japan", "みやぎ": "Miyagi, Japan", "miyagi": "Miyagi, Japan",
    "秋田": "Akita, Japan", "秋田県": "Akita, Japan", "あきた": "Akita, Japan", "akita": "Akita, Japan",
    "山形": "Yamagata, Japan", "山形県": "Yamagata, Japan", "やまがた": "Yamagata, Japan", "yamagata": "Yamagata, Japan",
    "福島": "Fukushima, Japan", "福島県": "Fukushima, Japan", "ふくしま": "Fukushima, Japan", "fukushima": "Fukushima, Japan",

    // 関東
    "茨城": "Ibaraki, Japan", "茨城県": "Ibaraki, Japan", "いばらき": "Ibaraki, Japan", "ibaraki": "Ibaraki, Japan",
    "栃木": "Tochigi, Japan", "栃木県": "Tochigi, Japan", "とちぎ": "Tochigi, Japan", "tochigi": "Tochigi, Japan",
    "群馬": "Gunma, Japan", "群馬県": "Gunma, Japan", "ぐんま": "Gunma, Japan", "gunma": "Gunma, Japan",
    "埼玉": "Saitama, Japan", "埼玉県": "Saitama, Japan", "さいたま": "Saitama, Japan", "saitama": "Saitama, Japan",
    "千葉": "Chiba, Japan", "千葉県": "Chiba, Japan", "ちば": "Chiba, Japan", "chiba": "Chiba, Japan",
    "東京": "Tokyo, Japan", "東京都": "Tokyo, Japan", "とうきょう": "Tokyo, Japan", "tokyo": "Tokyo, Japan",
    "神奈川": "Kanagawa, Japan", "神奈川県": "Kanagawa, Japan", "かながわ": "Kanagawa, Japan", "kanagawa": "Kanagawa, Japan",

    // 甲信越・北陸
    "新潟": "Niigata, Japan", "新潟県": "Niigata, Japan", "にいがた": "Niigata, Japan", "niigata": "Niigata, Japan",
    "富山": "Toyama, Japan", "富山県": "Toyama, Japan", "とやま": "Toyama, Japan", "toyama": "Toyama, Japan",
    "石川": "Ishikawa, Japan", "石川県": "Ishikawa, Japan", "いしかわ": "Ishikawa, Japan", "ishikawa": "Ishikawa, Japan",
    "福井": "Fukui, Japan", "福井県": "Fukui, Japan", "ふくい": "Fukui, Japan", "fukui": "Fukui, Japan",
    "山梨": "Yamanashi, Japan", "山梨県": "Yamanashi, Japan", "やまなし": "Yamanashi, Japan", "yamanashi": "Yamanashi, Japan",
    "長野": "Nagano, Japan", "長野県": "Nagano, Japan", "ながの": "Nagano, Japan", "nagano": "Nagano, Japan",

    // 東海
    "岐阜": "Gifu, Japan", "岐阜県": "Gifu, Japan", "ぎふ": "Gifu, Japan", "gifu": "Gifu, Japan",
    "静岡": "Shizuoka, Japan", "静岡県": "Shizuoka, Japan", "しずおか": "Shizuoka, Japan", "shizuoka": "Shizuoka, Japan",
    "愛知": "Aichi, Japan", "愛知県": "Aichi, Japan", "あいち": "Aichi, Japan", "aichi": "Aichi, Japan",
    "三重": "Mie, Japan", "三重県": "Mie, Japan", "みえ": "Mie, Japan", "mie": "Mie, Japan",

    // 関西
    "滋賀": "Shiga, Japan", "滋賀県": "Shiga, Japan", "しが": "Shiga, Japan", "shiga": "Shiga, Japan",
    "京都": "Kyoto, Japan", "京都府": "Kyoto, Japan", "きょうと": "Kyoto, Japan", "kyoto": "Kyoto, Japan",
    "大阪": "Osaka, Japan", "大阪府": "Osaka, Japan", "おおさか": "Osaka, Japan", "osaka": "Osaka, Japan",
    "兵庫": "Hyogo, Japan", "兵庫県": "Hyogo, Japan", "ひょうご": "Hyogo, Japan", "hyogo": "Hyogo, Japan",
    "奈良": "Nara, Japan", "奈良県": "Nara, Japan", "なら": "Nara, Japan", "nara": "Nara, Japan",
    "和歌山": "Wakayama, Japan", "和歌山県": "Wakayama, Japan", "わかやま": "Wakayama, Japan", "wakayama": "Wakayama, Japan",

    // 中国
    "鳥取": "Tottori, Japan", "鳥取県": "Tottori, Japan", "とっとり": "Tottori, Japan", "tottori": "Tottori, Japan",
    "島根": "Shimane, Japan", "島根県": "Shimane, Japan", "しまね": "Shimane, Japan", "shimane": "Shimane, Japan",
    "岡山": "Okayama, Japan", "岡山県": "Okayama, Japan", "おかやま": "Okayama, Japan", "okayama": "Okayama, Japan",
    "広島": "Hiroshima, Japan", "広島県": "Hiroshima, Japan", "ひろしま": "Hiroshima, Japan", "hiroshima": "Hiroshima, Japan",
    "山口": "Yamaguchi, Japan", "山口県": "Yamaguchi, Japan", "やまぐち": "Yamaguchi, Japan", "yamaguchi": "Yamaguchi, Japan",

    // 四国
    "徳島": "Tokushima, Japan", "徳島県": "Tokushima, Japan", "とくしま": "Tokushima, Japan", "tokushima": "Tokushima, Japan",
    "香川": "Kagawa, Japan", "香川県": "Kagawa, Japan", "かがわ": "Kagawa, Japan", "kagawa": "Kagawa, Japan",
    "愛媛": "Ehime, Japan", "愛媛県": "Ehime, Japan", "えひめ": "Ehime, Japan", "ehime": "Ehime, Japan",
    "高知": "Kochi, Japan", "高知県": "Kochi, Japan", "こうち": "Kochi, Japan", "kochi": "Kochi, Japan",

    // 九州・沖縄
    "福岡": "Fukuoka, Japan", "福岡県": "Fukuoka, Japan", "ふくおか": "Fukuoka, Japan", "fukuoka": "Fukuoka, Japan",
    "佐賀": "Saga, Japan", "佐賀県": "Saga, Japan", "さが": "Saga, Japan", "saga": "Saga, Japan",
    "長崎": "Nagasaki, Japan", "長崎県": "Nagasaki, Japan", "ながさき": "Nagasaki, Japan", "nagasaki": "Nagasaki, Japan",
    "熊本": "Kumamoto, Japan", "熊本県": "Kumamoto, Japan", "くまもと": "Kumamoto, Japan", "kumamoto": "Kumamoto, Japan",
    "大分": "Oita, Japan", "大分県": "Oita, Japan", "おおいた": "Oita, Japan", "oita": "Oita, Japan",
    "宮崎": "Miyazaki, Japan", "宮崎県": "Miyazaki, Japan", "みやざき": "Miyazaki, Japan", "miyazaki": "Miyazaki, Japan",
    "鹿児島": "Kagoshima, Japan", "鹿児島県": "Kagoshima, Japan", "かごしま": "Kagoshima, Japan", "kagoshima": "Kagoshima, Japan",
    "沖縄": "Okinawa, Japan", "沖縄県": "Okinawa, Japan", "おきなわ": "Okinawa, Japan", "okinawa": "Okinawa, Japan"
};

// 英語名から日本語名への完全対応マップ（大文字小文字・スペース違いも網羅）
const cityNameMap = {
    "hokkaido": "北海道",
    "aomori": "青森県",
    "iwate": "岩手県",
    "miyagi": "宮城県",
    "akita": "秋田県",
    "yamagata": "山形県",
    "fukushima": "福島県",
    "ibaraki": "茨城県",
    "tochigi": "栃木県",
    "gunma": "群馬県",
    "saitama": "埼玉県",
    "chiba": "千葉県",
    "tokyo": "東京都",
    "kanagawa": "神奈川県",
    "niigata": "新潟県",
    "toyama": "富山県",
    "ishikawa": "石川県",
    "fukui": "福井県",
    "yamanashi": "山梨県",
    "nagano": "長野県",
    "gifu": "岐阜県",
    "shizuoka": "静岡県",
    "aichi": "愛知県",
    "mie": "三重県",
    "shiga": "滋賀県",
    "kyoto": "京都府",
    "osaka": "大阪府",
    "hyogo": "兵庫県",
    "nara": "奈良県",
    "wakayama": "和歌山県",
    "tottori": "鳥取県",
    "shimane": "島根県",
    "okayama": "岡山県",
    "hiroshima": "広島県",
    "yamaguchi": "山口県",
    "tokushima": "徳島県",
    "kagawa": "香川県",
    "ehime": "愛媛県",
    "kochi": "高知県",
    "fukuoka": "福岡県",
    "saga": "佐賀県",
    "nagasaki": "長崎県",
    "kumamoto": "熊本県",
    "oita": "大分県",
    "miyazaki": "宮崎県",
    "kagoshima": "鹿児島県",
    "okinawa": "沖縄県"
};

const MAX_HISTORY = 5; // 最大5件まで保存[cite: 1, 2]

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("city").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });
    renderHistory();
});

// 天気の状態に応じたクラスを返す関数
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

    const rawCity = targetCity || cityInput.value.trim();

    resetBtn.style.display = "inline-block";
    weatherDiv.style.display = "block";

    if (!rawCity) {
        weatherDiv.className = "plain-card";
        weatherDiv.innerHTML = `<p class="error-message">都市名を入力してください（例: Tokyo）</p>`;
        return;
    }

    // 1. ユーザーの入力を英語クエリに変換
    let queryCity = searchCorrectionMap[rawCity] || searchCorrectionMap[rawCity.toLowerCase()] || rawCity;

    if (!queryCity.includes(",") && /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf]/.test(queryCity)) {
        queryCity = queryCity + ", Japan";
    }

    // ローディング中
    weatherDiv.className = "plain-card";
    searchBtn.disabled = true;
    searchBtn.textContent = "取得中...";
    weatherDiv.innerHTML = `<p style="color: #666; margin: 0;">天気を取得しています...</p>`;

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${queryCity}&lang=ja`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("指定された都市が見つかりませんでした。<br>英語表記または「都市名, Japan」でお試しください。");
        }

        const data = await response.json();
        const englishName = data.location.name.trim();
        const cleanEnglishKey = englishName.toLowerCase();

        // 2. 日本語化の優先順位付け：
        // ① ユーザーが最初に入力した文字が日本語（漢字・かな）なら、それをベースにするのが一番確実
        // ② 次にAPIの返却値をマップで変換
        // ③ どれにも当たらなければAPIの英語名を使う
        let japaneseName = "";
        
        if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf]/.test(rawCity)) {
            // ユーザーが日本語で入力していた場合、余計な「, Japan」などを除いた綺麗なお名前を採用
            japaneseName = rawCity.replace(/,?\s*Japan/i, "").trim();
            // もし「徳島」などと入力されていたら「徳島県」のように「県」や「府」「都」がなければ補うとより綺麗になりますが、そのまま表示
        } else {
            // ローマ字や英語で入力された場合
            japaneseName = cityNameMap[cleanEnglishKey] || data.location.region || englishName;
        }

        // 履歴には綺麗な日本語名を保存
        saveHistory(rawCity, japaneseName);

        // テーマカラー適用
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