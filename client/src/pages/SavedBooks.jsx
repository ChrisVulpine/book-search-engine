/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';


//=========================================================================================================
// RESTful API code
//=========================================================================================================

// import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';

//=========================================================================================================


import { useQuery, useMutation } from '@apollo/client'; // Import Apollo Client hooks
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries'; // Import the GraphQL query
import { REMOVE_BOOK } from '../utils/mutations'; // Import the GraphQL mutation


const SavedBooks = () => {


  const [userData, setUserData] = useState({ savedBooks: [] });

 // RESTful Code // const userDataLength = Object.keys(userData).length;

   // Use the useQuery hook to fetch user data
   const { loading, data } = useQuery(GET_ME);
   const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  useEffect(() => {

    if (data) {
      setUserData(data.me);
    }
  }, [data]);

//=========================================================================================================
// RESTful API code
//=========================================================================================================
//   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

//=========================================================================================================


  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {

      console.log('user not logged in!');

      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId }
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      //RESTful API code // const updatedUser = await response.json();


      setUserData(data.removeBook);

      // upon success, remove book's id from localStorage
      removeBookId(bookId);

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...Please Wait...</h2>;
  }

  return (
    <>
      <div fluid='true' className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books.</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              
              // eslint-disable-next-line react/jsx-key
              
              <Col md="4" key={book.bookId}>
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
