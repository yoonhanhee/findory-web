const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");

const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const realDelete = document.getElementById("realDelete");

let deleteIndex = null;

/* 삭제 버튼 */

if (deleteBtn) {

    deleteBtn.addEventListener("click", function () {

        deleteIndex = deleteBtn.dataset.index;

        deleteModal.classList.add("show");

    });

}

/* 취소 */

if (cancelDelete) {

    cancelDelete.addEventListener("click", function () {

        deleteModal.classList.remove("show");

    });

}

/* 삭제 */

if (realDelete) {

    realDelete.addEventListener("click", function () {

        location.href = "/delete/" + deleteIndex;

    });

}

/* 수정 버튼 효과 */

if (editBtn) {

    editBtn.addEventListener("mouseenter", function () {

        editBtn.style.transform = "translateY(-3px)";

    });

    editBtn.addEventListener("mouseleave", function () {

        editBtn.style.transform = "";

    });

}

/* 삭제 버튼 효과 */

if (deleteBtn) {

    deleteBtn.addEventListener("mouseenter", function () {

        deleteBtn.style.transform = "translateY(-3px)";

    });

    deleteBtn.addEventListener("mouseleave", function () {

        deleteBtn.style.transform = "";

    });

}