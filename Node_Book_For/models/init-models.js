import _book_list from "./book_list.js";
import _user_book from "./user_book.js";

const initModels = (sequelize) => {
  const book_list = _book_list(sequelize);
  const user_book = _user_book(sequelize);

  book_list.belongsTo(user_book, {
    // foreignKey: "username",
    as: "user",
  });
  user_book.hasMany(book_list, {
    // foreignKey: "username",
    as: "book",
  });

  return {
    book_list,
    user_book,
  };
};

export default initModels;
