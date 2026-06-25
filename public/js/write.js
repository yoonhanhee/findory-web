const genres = [
    { icon: "🪄", text: "판타지" },
    { icon: "💕", text: "로맨스" },
    { icon: "🔍", text: "추리" },
    { icon: "🌱", text: "성장" },
    { icon: "👻", text: "공포" },
    { icon: "⚔️", text: "액션" },
    { icon: "🚀", text: "SF" },
    { icon: "🎭", text: "드라마" },
    { icon: "😂", text: "코미디" },
    { icon: "📖", text: "에세이" },
    { icon: "📜", text: "역사" },
    { icon: "🎨", text: "예술" },
    { icon: "🧠", text: "심리" },
    { icon: "🔬", text: "과학" },
    { icon: "📦", text: "기타" }
];

const emotions = [
    { icon: "😊", text: "행복" },
    { icon: "🥰", text: "설렘" },
    { icon: "😌", text: "편안" },
    { icon: "🥹", text: "감동" },
    { icon: "😂", text: "재미" },
    { icon: "😍", text: "몰입" },
    { icon: "🤍", text: "위로" },
    { icon: "😭", text: "슬픔" },
    { icon: "😡", text: "분노" },
    { icon: "😱", text: "놀람" },
    { icon: "😶", text: "무덤덤" },
    { icon: "🤔", text: "생각 많음" },
    { icon: "🔥", text: "긴장" },
    { icon: "😥", text: "불안" },
    { icon: "📦", text: "기타" }
];

const weathers = [
    { icon: "☀️", text: "맑음" },
    { icon: "⛅", text: "구름" },
    { icon: "☁️", text: "흐림" },
    { icon: "🌧️", text: "비" },
    { icon: "⛈️", text: "폭우" },
    { icon: "❄️", text: "눈" },
    { icon: "🌬️", text: "바람" },
    { icon: "🌈", text: "기타" }
];

const times = [
    { icon: "🌅", text: "새벽" },
    { icon: "🌄", text: "아침" },
    { icon: "☀️", text: "낮" },
    { icon: "🌇", text: "오후" },
    { icon: "🌆", text: "저녁" },
    { icon: "🌙", text: "밤" },
    { icon: "⭐", text: "늦은 밤" },
    { icon: "🌈", text: "기타" }
];

makeCards("genreGrid", genres, true, "genreInput");
makeCards("emotionGrid", emotions, true, "emotionInput");
makeCards("weatherGrid", weathers, false, "weatherInput");
makeCards("timeGrid", times, false, "timeInput");

function makeCards(gridId, data, multi, inputId) {

    const grid = document.getElementById(gridId);
    const input = document.getElementById(inputId);

    data.forEach(function (item, index) {

        const card = document.createElement("div");

        card.className = "choice-card";

        if (index >= 4) {
            card.classList.add("extra");
        }

        card.dataset.value = item.text;

        card.innerHTML =
            "<span>" + item.icon + "</span>" +
            "<h4>" + item.text + "</h4>";

        if (input.value !== "") {

            const savedValues = input.value.split(",");

            if (savedValues.includes(item.text)) {

                card.classList.add("selected");

            }

        }

        card.onclick = function () {

            if (multi) {

                card.classList.toggle("selected");

                const selected = [];

                grid.querySelectorAll(".selected").forEach(function (c) {

                    selected.push(c.dataset.value);

                });

                input.value = selected.join(",");

            } else {

                grid.querySelectorAll(".choice-card").forEach(function (c) {

                    c.classList.remove("selected");

                });

                card.classList.add("selected");

                input.value = card.dataset.value;

            }

        };

        grid.appendChild(card);

    });

}

document.querySelectorAll(".toggle-btn").forEach(function (btn) {

    btn.onclick = function () {

        const grid = document.getElementById(btn.dataset.target);

        if (grid.classList.contains("collapsed")) {

            grid.classList.remove("collapsed");
            grid.classList.add("expanded");

            btn.textContent = "접기";

        } else {

            grid.classList.remove("expanded");
            grid.classList.add("collapsed");

            btn.textContent = "더보기";

        }

    };

});

const rating = document.getElementById("rating");
const starInput = document.getElementById("starInput");

for (let i = 1; i <= 5; i++) {

    const star = document.createElement("span");

    star.className = "star";
    star.innerHTML = "★";
    star.dataset.value = i;

    star.onmouseover = function () {

        fillStar(i);

    };

    star.onclick = function () {

        starInput.value = i;
        rating.dataset.selected = i;

        fillStar(i);

    };

    rating.appendChild(star);

}

if (starInput.value !== "") {

    rating.dataset.selected = starInput.value;

    fillStar(starInput.value);

}

rating.onmouseleave = function () {

    fillStar(rating.dataset.selected || 0);

};

function fillStar(score) {

    document.querySelectorAll(".star").forEach(function (star) {

        if (Number(star.dataset.value) <= score) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");

        }

    });

}

const coverInput = document.getElementById("cover");
const coverFileName = document.getElementById("coverFileName");
const coverPreview = document.getElementById("coverPreview");
const coverUpload = document.getElementById("coverUpload");

function showCoverPreview(file) {

    if (!file) {

        coverFileName.textContent = "선택된 이미지 없음";

        return;

    }

    coverFileName.textContent = file.name;

    const reader = new FileReader();

    reader.onload = function (event) {

        coverPreview.innerHTML =
            "<img src='" + event.target.result + "' alt='책 표지 미리보기'>";

    };

    reader.readAsDataURL(file);

}

if (coverInput) {

    coverInput.addEventListener("change", function () {

        showCoverPreview(coverInput.files[0]);

    });

}

if (coverUpload) {

    coverUpload.addEventListener("dragover", function (event) {

        event.preventDefault();

        coverUpload.classList.add("dragover");

    });

    coverUpload.addEventListener("dragleave", function () {

        coverUpload.classList.remove("dragover");

    });

    coverUpload.addEventListener("drop", function (event) {

        event.preventDefault();

        coverUpload.classList.remove("dragover");

        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith("image/")) {

            const dataTransfer = new DataTransfer();

            dataTransfer.items.add(file);

            coverInput.files = dataTransfer.files;

            showCoverPreview(file);

        } else {

            showAlert("이미지 파일만 업로드할 수 있습니다.");

        }

    });

}

const alertModal = document.getElementById("alertModal");
const alertMessage = document.getElementById("alertMessage");
const alertClose = document.getElementById("alertClose");

function showAlert(message) {

    alertMessage.textContent = message;
    alertModal.classList.add("show");

}

if (alertClose) {

    alertClose.addEventListener("click", function () {

        alertModal.classList.remove("show");

    });

}

document.querySelector("form").onsubmit = function () {

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const genreInput = document.getElementById("genreInput");
    const emotionInput = document.getElementById("emotionInput");
    const weatherInput = document.getElementById("weatherInput");
    const timeInput = document.getElementById("timeInput");
    const starInput = document.getElementById("starInput");

    if (title.value.trim() === "") {

        showAlert("책 제목을 입력해주세요.");
        return false;

    }

    if (author.value.trim() === "") {

        showAlert("저자를 입력해주세요.");
        return false;

    }

    if (genreInput.value === "") {

        showAlert("장르를 선택해주세요.");
        return false;

    }

    if (emotionInput.value === "") {

        showAlert("감정을 선택해주세요.");
        return false;

    }

    if (weatherInput.value === "") {

        showAlert("날씨를 선택해주세요.");
        return false;

    }

    if (timeInput.value === "") {

        showAlert("시간대를 선택해주세요.");
        return false;

    }

    if (starInput.value === "") {

        showAlert("별점을 선택해주세요.");
        return false;

    }

};