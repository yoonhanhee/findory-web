/* Recent book click */

const recentBooks = document.querySelectorAll(".recent-book");

recentBooks.forEach(function (book) {

    book.addEventListener("click", function () {

        const index = book.dataset.index;

        location.href = "/detail/" + index;

    });

});