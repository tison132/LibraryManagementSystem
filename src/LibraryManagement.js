import React, { useState, useEffect } from 'react';
import './index';

let books = [
  {id:1, title: 'To Kill a Mockingbird', author: 'Harper Lee', subject: 'Fiction', publishDate: '1960-07-11' ,BookCount:15,status:"Available"},
  {id:2, title: 'Pride and Prejudice', author: 'Jane Austen', subject: 'Classic Literature', publishDate: '1813-01-28',BookCount:15 ,status:"Available"},
  {id:3, title: '1984', author: 'George Orwell', subject: 'Dystopian Fiction', publishDate: '1949-06-08' ,BookCount:15,status:"Available"},
  {id:4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', subject: 'Classic Literature', publishDate: '1925-04-10',BookCount:15 ,status:"Available"},
  {id:5, title: 'To the Lighthouse', author: 'Virginia Woolf', subject: 'Modernist Literature', publishDate: '1927-05-05' ,BookCount:15,status:"Available"},
  {id:6, title: 'Moby-Dick', author: 'Herman Melville', subject: 'Adventure Fiction', publishDate: '1851-10-18' ,BookCount:15,status:"Available"},
  {id:7, title: 'The Catcher in the Rye', author: 'J.D. Salinger', subject: 'Coming-of-Age Fiction', publishDate: '1951-07-16' ,BookCount:15,status:"Available"},
  {id:8, title: 'Brave New World', author: 'Aldous Huxley', subject: 'Dystopian Fiction', publishDate: '1932-06-11',BookCount:15,status:"Available" },
  {id:9, title: 'The Hobbit', author: 'J.R.R. Tolkien', subject: 'Fantasy', publishDate: '1937-09-21' ,BookCount:15,BookCount:15,status:"Available"},
  {id:10, title: 'The Hunger Games', author: 'Suzanne Collins', subject: 'Young Adult Fiction', publishDate: '2008-09-14' ,BookCount:15,status:"Available"},
  {id:11, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', subject: 'Fantasy', publishDate: '1954-07-29',BookCount:15 ,status:"Available"},
  {id:12, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', subject: 'Psychological Fiction', publishDate: '1866-12-22' ,BookCount:15,status:"Available"},
  {id:13, title: 'The Odyssey', author: 'Homer', subject: 'Epic Poetry', publishDate: '8th Century BCE' ,BookCount:15,status:"Available"},
  {id:14, title: 'Jane Eyre', author: 'Charlotte Brontë', subject: 'Gothic Fiction', publishDate: '1847-10-16' ,BookCount:15,status:"Available"},
  {id:15, title: 'The Divine Comedy', author: 'Dante Alighieri', subject: 'Epic Poetry', publishDate: '1320' ,BookCount:15,status:"Available"},
  {id:16, title: 'Frankenstein', author: 'Mary Shelley', subject: 'Gothic Fiction', publishDate: '1818-01-01' ,BookCount:15,status:"Available"},
  {id:17, title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain', subject: 'Adventure Fiction', publishDate: '1884-12-10' ,BookCount:15,status:"Available"},
  {id:18, title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', subject: 'Historical Fiction', publishDate: '1850-03-16' ,BookCount:15,status:"Available"},
  {id:19, title: 'The Alchemist', author: 'Paulo Coelho', subject: 'Fiction', publishDate: '1988-06-01' ,BookCount:15,status:"Available"},
  {id:20, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', subject: 'Gothic Fiction', publishDate: '1890-07-01' ,BookCount:15,status:"Available"},
];

const pageSize = 10;

const LibraryManagement = () => {
  const [filter, setFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    filterBooks();
  }, [filter]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };
  const filterBooks = () => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = books.filter(
      book =>
        book.title.toLowerCase().includes(lowercasedFilter) ||
        book.author.toLowerCase().includes(lowercasedFilter) ||
        book.subject.toLowerCase().includes(lowercasedFilter) ||
        book.publishDate.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleTakeClick=(bookid)=>{
    if(books[bookid-1].BookCount!==0){
      books[bookid-1].BookCount-=1;
    }
    if(books[bookid-1].BookCount===0){
      books[bookid-1].status="Unavailable";
    }
    console.log(books[bookid-1]);
  }
  const handleReturnClick=(bookid)=>{
    if(books[bookid-1].BookCount<=20){
      books[bookid-1].BookCount+=1;
    }
    if(books[bookid-1].BookCount>0){
      books[bookid-1].status="available";
    }
    console.log(books[bookid-1]);
  }
  const renderBooks = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const booksToShow = filteredBooks.slice(start, end);
    
    return booksToShow.map((book, index) => (
      <div className="book-card" key={index}>
        <h3>{book.title}</h3>
        <p>Book Id : {book.id}</p>
        <p>Author: {book.author}</p>
        <p>Subject: {book.subject}</p>
        <p>Publish Date: {book.publishDate}</p>
        <p>Book Count: {book.BookCount}</p>
        <p className='avialablity'>Book Stutus: {book.status}</p>
        <button className='takebook' onClick={()=>handleTakeClick(book.id)}>Take Book</button>
        <button className='returnbook' onClick={()=>handleReturnClick(book.id)}>Return Book</button>
      </div>
    ));
  };
  
  const renderPagination = () => {
    const pageCount = Math.ceil(filteredBooks.length / pageSize);
    const pages = [];
    
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button
        
        key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
          >
          {i}
        </button>
      );
    }
    
    return <div className="pagination">{pages}</div>;
  };
  
  return (
    <div className="container">
      <h1>Library Management</h1>
      <div className="filters">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by Title, Author, Subject, or Publish Date"
        />
      </div>
      <div className="count-container">
        <div className="count-box">
          <p className="count-label">Title Count:</p>
          <p className="count-value">{filteredBooks.length}</p>
        </div>
      </div>
      <div className="book-list">{renderBooks()}</div>
      {renderPagination()}
    </div>
  );
};

export default LibraryManagement;