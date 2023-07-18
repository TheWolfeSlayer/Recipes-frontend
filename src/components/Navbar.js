import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
      <>
        <Navbar className="navColor">
          <Container>
            <Navbar.Brand href="/" className="fw-bolder">EZ Recipes</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/new" className="fw-bold">Add Recipe</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
export default NavigationBar;
