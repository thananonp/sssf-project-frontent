import {useParams} from "react-router";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import {LoadingSpinner} from "../ReturnStaff";
import {Container, ListGroup} from "react-bootstrap";

const AUTHOR = gql`
    query Author($id:ID!){
        author(id: $id) {
            id
            name
            biography
            imageUrl
        }
        
        books (author : $id){
            id
            title
            publisher{
                name
            }
        }
    }
`

const Author = () => {
    const id = useParams().id
    const {loading, error, data} = useQuery(AUTHOR, {variables: {id}})
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error :( {error}</p>;
    console.log(data)
    return (
        <Container>
            <img className="profileImage" src={data.author.imageUrl}/>
            <h1>Author: {data.author.name}</h1>
            <h5>List of books in by this author</h5>
            <ListGroup>
                {data.books.length ? data.books.map((book, index) => {
                    return (
                        <ListGroup.Item>{book.title + ' published by ' + book.publisher.name}</ListGroup.Item>
                    )
                }) : <ListGroup.Item>No book by this author yet.</ListGroup.Item>}
            </ListGroup>
        </Container>
    )
}

export default Author