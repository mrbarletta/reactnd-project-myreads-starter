import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const SearchBook = props => {
    let bookResults = [];
    if (props.bookResultSet.length > 0) {
        bookResults=props.bookResultSet.map((book, index) => {
            book.shelf='none';
            if(props.bookById[book.id]!==undefined){
                book.shelf=props.bookById[book.id][0].shelf;
            }
            return (
                <li key={index}>
                    <Book book={book} onChangeShelf={props.onChangeShelf} />
                </li>
            );
        });
    }
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={props.searchQuery}
                        onChange={event => {
                            props.searchBook(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {bookResults}
                </ol>
            </div>
        </div>
    );
};
export default SearchBook;
