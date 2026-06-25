/* 검색창 자동 포커스 */

const keyword = document.querySelector("input[name='keyword']");
const selects = document.querySelectorAll("select");

if (keyword) {

    window.onload = function () {

        keyword.focus();

    };

}

/* Enter로 검색 */

if (keyword) {

    keyword.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            event.target.form.submit();

        }

    });

}

/* 검색조건 초기화 */

function resetFilter() {

    keyword.value = "";

    selects.forEach(function (select) {

        select.selectedIndex = 0;

    });

}

/* 검색어 없을 때 안내 */

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (event) {

        const keywordValue = keyword.value.trim();

        let selected = false;

        selects.forEach(function (select) {

            if (select.value !== "") {

                selected = true;

            }

        });

        if (keywordValue === "" && !selected) {

            alert("검색어 또는 검색 조건을 하나 이상 선택해주세요.");

            event.preventDefault();

        }

    });

}

/* 검색 결과 상세보기 */

const resultBooks = document.querySelectorAll(".result-book");

resultBooks.forEach(function (book) {

    book.addEventListener("click", function () {

        const index = book.dataset.index;

        location.href = "/detail/" + index;

    });

});