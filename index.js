const express = require("express");
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "public/uploads");

    },

    filename: function (req, file, cb) {

        const filename = Date.now() + "-" + file.originalname;

        cb(null, filename);

    }

});

const upload = multer({
    storage: storage
});

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let users = [];
let currentUser = null;

app.get("/", function (req, res) {

    res.render("login", {
        message: ""
    });

});

app.post("/signup", function (req, res) {

    const id = req.body.userId;
    const pw = req.body.userPw;

    if (id === "" || pw === "") {

        res.render("login", {
            message: "아이디와 비밀번호를 입력해주세요."
        });

        return;

    }

    const sameUser = users.find(function (user) {

        return user.id === id;

    });

    if (sameUser) {

        res.render("login", {
            message: "이미 가입된 아이디입니다."
        });

        return;

    }

    users.push({
        id: id,
        pw: pw,
        books: []
    });

    res.render("login", {
        message: "회원가입이 완료되었습니다. 이제 로그인해주세요."
    });

});

app.post("/login", function (req, res) {

    const id = req.body.userId;
    const pw = req.body.userPw;

    if (id === "" || pw === "") {

        res.render("login", {
            message: "아이디와 비밀번호를 입력해주세요."
        });

        return;

    }

    if (users.length === 0) {

        res.render("login", {
            message: "저장된 회원 정보가 없습니다. 회원가입을 먼저 해주세요."
        });

        return;

    }

    const loginUser = users.find(function (user) {

        return user.id === id && user.pw === pw;

    });

    if (loginUser) {

        currentUser = loginUser;

        res.render("home", {
            user: currentUser
        });

    } else {

        res.render("login", {
            message: "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
        });

    }

});

app.get("/home", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    res.render("home", {
        user: currentUser
    });

});

app.get("/write", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    res.render("write", {
        user: currentUser,
        message: "",
        mode: "write",
        book: null,
        index: null
    });

});

app.post("/write", upload.single("cover"), function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const emotion = req.body.emotion;
    const weather = req.body.weather;
    const time = req.body.time;
    const star = req.body.star;
    const review = req.body.review;

    if (title === "" || author === "") {

        res.render("write", {
            user: currentUser,
            message: "책 제목과 저자는 반드시 입력해주세요.",
            mode: "write",
            book: null,
            index: null
        });

        return;

    }

    let coverImage = "/images/default-book.png";

        if (req.file) {

            coverImage = "/uploads/" + req.file.filename;

        }

    currentUser.books.push({
        title: title,
        author: author,
        genre: genre,
        emotion: emotion,
        weather: weather,
        time: time,
        star: star,
        review: review,
        coverImage: coverImage
    });

    res.render("home", {
        user: currentUser
    });

});

app.get("/search", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    res.render("search", {
        user: currentUser,
        results: [],
        keyword: ""
    });

});

app.post("/search", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    const keyword = req.body.keyword;
    const genre = req.body.genre;
    const emotion = req.body.emotion;
    const weather = req.body.weather;
    const time = req.body.time;

    const results = currentUser.books.filter(function (book) {

        const keywordMatch =
            keyword === "" ||
            book.title.includes(keyword) ||
            book.author.includes(keyword) ||
            book.review.includes(keyword);

        const genreMatch =
            genre === "" ||
            book.genre.includes(genre);

        const emotionMatch =
            emotion === "" ||
            book.emotion.includes(emotion);

        const weatherMatch =
            weather === "" ||
            book.weather === weather;

        const timeMatch =
            time === "" ||
            book.time === time;

        return keywordMatch && genreMatch && emotionMatch && weatherMatch && timeMatch;

    });

    res.render("search", {
        user: currentUser,
        results: results,
        keyword: keyword
    });

});

app.get("/library", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    res.render("library", {
        user: currentUser
    });

});

app.get("/detail/:index", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    const index = Number(req.params.index);
    const book = currentUser.books[index];

    if (book === undefined) {

        res.render("home", {
            user: currentUser
        });

        return;

    }

    res.render("detail", {
        user: currentUser,
        book: book,
        index: index
    });

});

app.get("/delete/:index", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    const index = Number(req.params.index);

    if (currentUser.books[index] !== undefined) {

        currentUser.books.splice(index, 1);

    }

    res.render("library", {
        user: currentUser
    });

});

app.get("/edit/:index", function (req, res) {

    if (currentUser === null) {

        res.render("login", {
            message: "로그인을 먼저 해주세요."
        });

        return;

    }

    const index = Number(req.params.index);
    const book = currentUser.books[index];

    res.render("write", {
        user: currentUser,
        message: "",
        mode: "edit",
        book: book,
        index: index
    });

});

app.post("/edit/:index", upload.single("cover"), function (req, res) {

    const index = Number(req.params.index);
    const oldBook = currentUser.books[index];

    let coverImage = oldBook.coverImage;

    if (req.file) {

        coverImage = "/uploads/" + req.file.filename;

    }

    currentUser.books[index] = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        emotion: req.body.emotion,
        weather: req.body.weather,
        time: req.body.time,
        star: req.body.star,
        review: req.body.review,
        coverImage: coverImage
    };

    res.render("detail", {
        user: currentUser,
        book: currentUser.books[index],
        index: index
    });

});

app.get("/logout", function (req, res) {

    currentUser = null;

    res.render("login", {
        message: "로그아웃되었습니다. 다시 로그인해주세요."
    });

});

app.listen(port, function () {

    console.log("서버 실행 중: http://localhost:" + port);

});