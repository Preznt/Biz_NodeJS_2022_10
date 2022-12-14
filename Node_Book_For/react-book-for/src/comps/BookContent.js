import { useBookContext } from "../context/BookContext";
import BookItem from "./BookItem";
import "../css/Content.css";

const BookContent = () => {
  const { showDataList } = useBookContext();
  // console.log(showDataList[5].isbn);

  const showItem = showDataList.map((data) => {
    <BookItem data={data} />;
  });

  return (
    <article className="Lib">
      <div className="btns">
        <button className="highlight set">전체보기</button>
        <button className="highlight">읽는 중</button>
        <button className="highlight">읽은 책</button>
        <button className="highlight">읽을 책</button>
        <button className="highlight">버릴 책</button>
      </div>
      <h1>내 서재</h1>
      <div>{showItem}</div>
    </article>
  );
};

export default BookContent;
