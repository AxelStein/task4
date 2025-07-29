import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BsUnlockFill, BsLockFill, BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import userRepository from '../api/user.repository.js';
import Form from 'react-bootstrap/Form';

function Dashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = (sortBy, sortAsc) => {
    console.log('fetchUsers');
    userRepository.getUsers(sortBy, sortAsc)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }

  const blockUsers = (event) => {

  }

  const unblockUsers = (event) => {

  }

  const deleteUsers = (event) => {
    
  }

  const handleUserCheckboxChange = (event) => {
    console.log(`id=${event.target.id} isChecked=${event.target.checked}`);
  }

  useEffect(() => fetchUsers(), []);

  return (
    <div>
      <Navbar data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Button variant='outline-primary' className='me-2'>
              <BsLockFill /> Block
            </Button>

            <Button variant='outline-primary' className='me-2'>
              <BsUnlockFill />
            </Button>

            <Button variant='outline-danger' className='me-2'>
              <BsTrash />
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Table>
        <thead>
          <tr>
            <th><Form.Check/></th>
            <th>Name</th>
            <th>Email</th>
            <th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Form.Check id={user.id} onChange={handleUserCheckboxChange}/> {user.id}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;