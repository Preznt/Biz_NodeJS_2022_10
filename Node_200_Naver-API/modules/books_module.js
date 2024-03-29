import DB from "../models/index.js";
import { BOOK_RES } from "../config/api_res_code.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;

export const bookInput = async (book, username) => {
  // 만약 사용자정보(username) 값이 없으면 더이상 진행하지 말기
  // 호출한 쪽에서 if(!bookInput())... 이러한 코드는 return null, return false 와
  // 동일한 효과를 낸다
  if (!username) return null;
  // user 정보를 추가할때 오류가 발생하면 그냥 통과
  const my_book = {
    my_username: username, // 로그인 정보가 없으면 null 값
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_oprice: book.discount,
  };
  // 도서정보 저장하기

  try {
    await BOOKS.create(book);
    bCreateYes = true;
  } catch (err) {
    console.log("Book create", err);
    // return res.send("도서정보 추가 오류");
    try {
      await BOOKS.update(book, { where: { isbn: book.isbn } });
    } catch (e) {
      console.log("Book update", e);

      throw new Error(JSON.stringify(BOOK_RES.BOOK_NOT_CREATE));
    }
  }

  // 내(user) 도서 정보 저장하기
  try {
    await MY_BOOKS.create(my_book);
  } catch (err) {
    console.log("MyBook, Create", err);
    try {
      await MY_BOOKS.update(my_book, {
        // Op.AND 속성대신에 Where{조건1, 조건2...}을
        // 부여하면 조건1 and 조건2 and ... 조건이 성립한다
        where: {
          // [Op.and]: [
          //   { my_isbn: my_book.my_isbn },
          //   { my_username: my_book.my_username },
          // ],
          my_isbn: my_book.my_isbn,
          my_username: my_book.my_username,
        },
      });
    } catch (e) {
      console.log("MyBook, Update", e);
      //   return res.send("내 도서정보 추가 오류");
      throw new Error(JSON.stringify(BOOK_RES.MY_BOOK_NOT_CREATE));
    }
  }
};

export const getMyBooks = async (user) => {
  const username = user.username;
  console.log("getMyBooks", user);
  let myBooks = null;
  try {
    myBooks = await MY_BOOKS.findAll({
      where: { my_username: username },
      include: "my_isbn_tbl_book",
    });
  } catch (e) {
    console.log(e);
    throw new Error(BOOK_RES.MY_BOOK_NOT_FOUND);
  }

  // return myBooks;
  const myBooksInfo = myBooks.map((book) => {
    return book.my_isbn_tbl_book;
  });
  return myBooksInfo;
};

export default { bookInput, getMyBooks };
