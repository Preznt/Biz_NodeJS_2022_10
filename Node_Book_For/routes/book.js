import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/thumbnail_upload.js";

const UserBook = DB.models.user_book;
const BookList = DB.models.book_list;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const result = await UserBook.findAll({
    //   attributes: ["b_isbn"],
    //   where: { username: "bjw1403@gmail.com" },
    // });
    // return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({ error: "SELECT 오류" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await UserBook.findAll({
      where: { my_username: "bjw1403@gmail.com" },
      include: [{ model: BookList }],
      raw: true,
    });
    return res.json(result);
  } catch (e) {
    console.log("첫 로더 데이터 가져오기 오류 \n", e);
  }
});

router.post("/insert", fileUp.single("upload"), async (req, res) => {
  const detail = JSON.parse(req.body.detail);
  const myDetail = JSON.parse(req.body.myDetail);
  detail.thumbnail = `/uploads/${req?.file?.filename}`;

  myDetail.my_username = "bjw1403@gmail.com";
  myDetail.my_isbn = detail.isbn;

  await BookList.create(detail);
  await UserBook.create(myDetail);
});

router.post("/my/insert", async (req, res) => {
  // req.body.username = "bjw1403@gmail.com";
  const data = req.body;
  let isbn = data.isbn;
  if (isbn.length > 14) {
    isbn = isbn.substr(11, 13);
  } else {
    isbn = isbn.substr(1, 13);
  }
  // console.log(data);

  const bookData = {
    isbn: isbn,
    title: data.title,
    thumbnail: data.thumbnail,
    authors: data.authors[0],
    publisher: data.publisher,
    url: data.url,
  };

  const userBookData = {
    my_username: "bjw1403@gmail.com",
    my_isbn: isbn,
  };

  // 북리스트에 카카오 API로 받은 데이터 저장
  try {
    await BookList.create(bookData);
  } catch (err) {
    console.log("book_list 추가 오류 \n", err);
  }

  // 내 책에 추가한 책 저장
  try {
    await UserBook.create(userBookData);
  } catch (err) {
    console.log("user_book 추가 오류", err);
  }

  const result = await UserBook.findAll({
    where: { my_username: "bjw1403@gmail.com" },
    include: [
      { model: BookList, attributes: ["title", "thumbnail", "authors"] },
    ],
    raw: true,
  });
  // console.log(result);

  return res.json(result);

  // const rList = await result.map((d) => {
  //   return d.my_isbn_book_list;
  // });
  // res.json(rList);

  // const f_book = await result.f_booklist;

  // console.log(result.book_list);

  // const result = await UserBook.findAll({
  //   attributes: ["b_isbn"],
  //   where: { username: "bjw1403@gmail.com" },
  // });
  // return res.json(result);
});

router.post("/delete", (req, res) => {
  console.log(req.body);
  UserBook.destroy({ where: { my_isbn: req.body } });
});
export default router;
