import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import Book from "./Book";
import ListBooks from "./ListBooks";
var _ = require("lodash");

class BooksApp extends React.Component {
    state = {
        bookList: {},
        bookResultSet: [],
        bookById: [],
        searchQuery: "",
    };
    componentDidMount = () => {
        BooksAPI.getAll().then(books => {
            //This code splits the results based on the current shelf
            const booksByShelf = _.groupBy(books, "shelf");
            const bookById = _.groupBy(books, "id");
            this.setState({ bookList: booksByShelf, bookById: bookById });
        });
    };
    onChangeShelf = (event, book) => {
        const currentSearchQuery = this.state.searchQuery;
        BooksAPI.update(book, event.target.value).then(result => {
            //Get the new list - we could just modify the State too
            BooksAPI.getAll().then(books => {
                //This code splits the results based on the current shelf
                let booksByShelf = _.groupBy(books, "shelf");
                const bookById = _.groupBy(books, "id");
                this.setState({ bookList: booksByShelf, bookById: bookById });
            });
            if (currentSearchQuery !== "") {
                BooksAPI.search(currentSearchQuery, 5).then(books => {
                    this.setState({ bookResultSet: books });
                });
            }
        });
    };
    searchBook = query => {
        this.setState({ searchQuery: query });
        BooksAPI.search(query, 5).then(books => {
            this.setState({ bookResultSet: books });
        });
    };

    render() {
        const { bookList, searchQuery, bookResultSet, bookById } = this.state;
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() =>
                        <SearchBook
                            bookResultSet={bookResultSet}
                            bookById={bookById}
                            onChangeShelf={(event, book) => {
                                this.onChangeShelf(event, book);
                            }}
                            searchQuery={searchQuery}
                            searchBook={query => {
                                this.searchBook(query);
                            }}
                        />}
                />
                <Route
                    exact
                    path="/"
                    render={({ history }) =>
                        <ListBooks
                            onChangeShelf={(event, book) => {
                                this.onChangeShelf(event, book);
                            }}
                            bookList={bookList}
                        />}
                />
            </div>
        );
    }
}

export default BooksApp;
