import { Button, Navbar, Nav } from 'react-bootstrap';


export default function LoginPage() {
    return (
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
          </Navbar>
          <Button variant="primary">Click Me</Button>
        </div>
    );
}