// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <div>
//             <Link to='/'>Home</Link>
//             |
//             <Link to='/new'>New</Link>
//         </div>
//     )
// }

// export default Navbar

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">EZ Recipes</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/new">New</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default NavigationBar;
