import {Link} from "react-router-dom";
import {Button, Card, CardDeck, Container, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import {useField} from "../hooks";
import {newSearchQuery} from "../reducers/searchQueryReducer";
import {useHistory} from "react-router";
import {connect} from "react-redux";

const Landing = (props) => {
    const search = useField('text')
    const history = useHistory()

    const toSearch = () => {
        props.newSearchQuery(search.value)
        history.push('/search')
    }

    const showCard = () => {
        if (props.login.login) {
            if (props.login.user.type === "user") {
                return (
                    <Card style={{width: '18rem'}}>
                        <Card.Header as="h5">Welcome {props.login.user.user.firstName}</Card.Header>
                        <Card.Body>
                            <Card.Title>Click here to go to your user page.
                                <Link to="/user/home"><Button>User page</Button></Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                )
            } else if (props.login.user.type === "staff") {
                return (<Card style={{width: '18rem'}}>
                    <Card.Header as="h5">Welcome {props.login.user.user.firstName}</Card.Header>
                    <Card.Body>
                        <Card.Title>Click here to go to your staff page
                            <Link to="/staff/home"><Button>Staff page</Button></Link>
                        </Card.Title>
                    </Card.Body>
                </Card>)
            }
        } else {
            return (
                <CardDeck>
                    <Card style={{width: '18rem'}}>
                        <Card.Header as="h5">New user</Card.Header>
                        <Card.Body>
                            <Card.Title>Are you new to the library website</Card.Title>
                            <div>Already has an account
                                <Link to="/user/login"><Button>Login</Button></Link>
                            </div>
                            <div>
                                No account?
                                <Link to="/user/register"><Button>Register here</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '18rem'}}>
                        <Card.Header as="h5">Staff</Card.Header>
                        <Card.Body>
                            <Card.Title>Free candy for staff here</Card.Title>
                            <Link to="/staff"><Button>Staff login</Button></Link>
                            <Link to="/staff/register"><Button>Staff Register</Button></Link>
                        </Card.Body>
                    </Card>
                </CardDeck>
            )
        }
    };
    return (
        <Container fluid>
            <h1>Welcome to library system</h1>
            <InputGroup className="mb-3">
                <FormControl
                    onChange={search.onChange}
                    value={search.value}
                    placeholder="Search books, publishers and writers..."
                    aria-label="Search library"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button onClick={toSearch} variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <br/>
            <CardDeck>
                <Card style={{width: '18rem'}}>
                    <Card.Header>Opening times</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Mon - Fri<span className="float-right">8 - 18</span></ListGroup.Item>
                        <ListGroup.Item>Sat<span className="float-right">10 -  18</span></ListGroup.Item>
                        <ListGroup.Item>Sun<span className="float-right">Closed</span></ListGroup.Item>
                    </ListGroup>
                </Card>
                {/*{(props.login.login && props.login.user.type === "user")*/}
                {/*    ? <Card style={{width: '18rem'}}>*/}
                {/*        <Card.Header as="h5">Welcome {props.login.user.user.firstName}</Card.Header>*/}
                {/*        <Card.Body>*/}
                {/*            <Card.Title>Click here to go to your user page.*/}
                {/*                <Link to="/user/home"><Button>User page</Button></Link>*/}
                {/*            </Card.Title>*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*    : <Card style={{width: '18rem'}}>*/}
                {/*        <Card.Header as="h5">New user</Card.Header>*/}
                {/*        <Card.Body>*/}
                {/*            <Card.Title>Are you new to the library website</Card.Title>*/}
                {/*            <div>Already has an account*/}
                {/*                <Link to="/user/login"><Button>Login</Button></Link>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                No account?*/}
                {/*                <Link to="/user/register"><Button>Register here</Button></Link>*/}
                {/*            </div>*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*}*/}
                {showCard()}


            </CardDeck>
            {/*<img*/}
            {/*    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>*/}


        </Container>

    )
}

const mapDispatchToProps = {
    newSearchQuery
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedLanding = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default connectedLanding
