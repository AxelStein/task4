import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import { BsUnlockFill, BsLockFill, BsTrash } from 'react-icons/bs';
import { useEffect, useState, useCallback } from 'react';
import userRepository from '../api/user.repository.js';
import Form from 'react-bootstrap/Form';
import handleApiError from '../api/error.handler.js';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Dashboard() {
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  let userName = "";
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    userName = user ? user.name : "";
  } catch (e) { }

  const showErrorToast = (err) => {
    toast.error(handleApiError(err).message);
  }

  const showToast = (message) => {
    toast.info(message);
  }

  const fetchUsers = useCallback(() => {
    clearCheckedIds();
    setIsFetchingUsers(true);

    userRepository.getUsers()
      .then(res => setUsers(res.data))
      .catch(err => setError(handleApiError(err).message))
      .finally(() => setIsFetchingUsers(false));
  }, []);

  const checkForDataInconsistency = (err) => {
    const status = handleApiError(err).status;
    if (status && status === 410) {
      fetchUsers();
    }
  }

  const blockUsers = (block) => {
    userRepository.blockUsers([...checkedIds], block)
      .then(() => {
        fetchUsers();
        showToast(block ? 'Users have been blocked' : 'Users have been unblocked');
      })
      .catch(err => {
        checkForDataInconsistency(err);
        showErrorToast(err);
      });
  }

  const clearCheckedIds = () => setCheckedIds(new Set());

  const deleteUsers = () => {
    userRepository.deleteUsers([...checkedIds])
      .then(() => {
        fetchUsers();
        showToast('Users have been deleted');
      })
      .catch(err => {
        checkForDataInconsistency(err);
        showErrorToast(err);
      });
  }

  const handleUserCheckboxChange = (event) => {
    const id = Number(event.target.id);
    const checked = event.target.checked;
    const newSet = new Set(checkedIds);
    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setCheckedIds(newSet);
  }

  const allUsersAreChecked = () => checkedIds.size === users.length;

  const handleAllCheckboxChange = () => {
    if (allUsersAreChecked()) {
      clearCheckedIds();
    } else {
      setCheckedIds(new Set(users.map(user => user.id)));
    }
  }

  useEffect(() => fetchUsers(), [fetchUsers]);

  return (
    <div className="flex flex-col">
      <div className='sticky-top bg-white shadow-sm app-bar d-flex justify-content-between'>
        <div>
          <Button
            variant='outline-primary'
            className='me-2'
            disabled={checkedIds.size === 0}
            onClick={() => blockUsers(true)}>
            <BsLockFill /> Block
          </Button>

          <Button
            variant='outline-primary'
            className='me-2'
            disabled={checkedIds.size === 0}
            onClick={() => blockUsers(false)}>
            <BsUnlockFill />
          </Button>

          <Button
            variant='outline-danger'
            className='me-2'
            disabled={checkedIds.size === 0}
            onClick={deleteUsers}>
            <BsTrash />
          </Button>
        </div>

        <div>
          {userName} <span>Sign out</span>
        </div>

      </div>

      <main className="flex-grow overflow-y-auto app-bar">
        {isFetchingUsers ? (<div className='spinner' />) : (
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th><Form.Check onChange={handleAllCheckboxChange} checked={allUsersAreChecked()} /></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Last seen</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ opacity: user.isBlocked ? 0.4 : 1 }}>
                    <td>
                      <Form.Check
                        id={user.id}
                        onChange={handleUserCheckboxChange}
                        checked={checkedIds.has(user.id)} />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <OverlayTrigger placement='bottom' overlay={<Tooltip>{moment(user.lastSeen).format('MMMM Do YYYY, k:mm:ss')}</Tooltip>}>
                        <div>
                          {moment(user.lastSeen).fromNow()}
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {error && (<Alert variant='danger' className='m-3'>{error}</Alert>)}

            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        )}
      </main>


    </div>
  );
}

export default Dashboard;