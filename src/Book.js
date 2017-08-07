import React from "react";
import { Link } from "react-router-dom";

const Book = props => {
    console.log(props.book);
    let bookImageUrl=""
    if(props.book.imageLinks!==undefined  && props.book.imageLinks.smallThumbnail!==undefined){
        bookImageUrl=props.book.imageLinks.smallThumbnail;
    }
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(" + bookImageUrl + ")",
                    }}
                />
                <div className="book-shelf-changer">
                    <select value={props.book.shelf} onChange={(event)=>{props.onChangeShelf(event, props.book)}}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{(props.book.authors!==undefined && props.book.authors.length>0)? props.book.authors.map((author, index)=> author + " "): ''}</div>
        </div>
    );
};
export default Book;
