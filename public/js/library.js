/* 카드 클릭 */

const libraryCards = document.querySelectorAll(".library-card");

libraryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const index = card.dataset.index;

        location.href = "/detail/" + index;

    });

});

/* 마우스 효과 */

libraryCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.transform = "translateY(-6px)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "";

    });

});

/* 기록 개수 확인 */

const cards = document.querySelectorAll(".library-card");

if (cards.length === 0) {

    console.log("저장된 기록이 없습니다.");

} else {

    console.log(cards.length + "개의 기록이 있습니다.");

}