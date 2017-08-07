import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const ListBooks = props => {
    let shelfList = [];
    let shelfs = ["currentlyReading", "wantToRead", "read"];
    let shelfsName = ["Currently Reading", "Want to Read", "Read", "None"];
    if (props.bookList.currentlyReading !== undefined) {
        shelfs.map((s, i) => {
            shelfList.push(
                <div key={i} className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">
                                {shelfsName[i]}
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {props.bookList[s].map((book, index) => {
                                        return (
                                            <li key={index}>
                                                <Book book={book} onChangeShelf={props.onChangeShelf}/>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {shelfList}
            <div className="open-search">
                <Link className="" to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    );
};
export default ListBooks;
