import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import { BsUnlockFill, BsLockFill, BsTrash, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useEffect, useState, useCallback } from 'react';
import userRepository from '../api/user.repository.js';
import authRepository from '../api/auth.repository.js';
import Form from 'react-bootstrap/Form';
import handleApiError from '../api/error.handler.js';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { LOCAL_USER } from '../constants.js';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import toastContainer from '../components/toast.container.js';

function Dashboard() {
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [sortBy, setSortBy] = useState('lastSeen');
  const [sortAsc, setSortAsc] = useState(false);

  const navigate = useNavigate();

  let userName = "";
  try {
    const user = JSON.parse(localStorage.getItem(LOCAL_USER));
    userName = user ? user.name : "";
  } catch (e) { }

  const showErrorToast = (err) => {
    toast.error(handleApiError(err).message);
  }

  const showToast = (message) => {
    toast.info(message);
  }

  const fetchUsers = useCallback(() => {
    setFetchError(null);

    userRepository.getUsers(sortBy, sortAsc)
      .then(res => setUsers(res.data))
      .catch(err => {
        const message = handleApiError(err).message;
        if (isFetchingUsers) {
          setFetchError(message);
        } else {
          showErrorToast(err);
        }
      })
      .finally(() => setIsFetchingUsers(false));
  }, [sortBy, sortAsc, isFetchingUsers]);

  const checkForDataInconsistency = (err) => {
    const status = handleApiError(err).status;
    if (status && status === 410) {
      clearCheckedIds();
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
        clearCheckedIds();
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

  const allUsersAreChecked = () => users.length !== 0 && checkedIds.size === users.length;

  const handleAllCheckboxChange = () => {
    if (allUsersAreChecked()) {
      clearCheckedIds();
    } else {
      setCheckedIds(new Set(users.map(user => user.id)));
    }
  }

  const renderSortIndicator = (column) => {
    if (column === sortBy) {
      return sortAsc ? <BsArrowUp /> : <BsArrowDown />;
    }
    return null;
  }

  const handleColumnClick = (column) => {
    if (column === sortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
    }
  }

  const handleSignOutClick = () => {
    authRepository.signOut()
      .then(() => navigate('/sign-in', { replace: true }))
      .catch(e => showErrorToast(e));
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

        <SplitButton title={userName} variant='primary'>
          <Dropdown.Item onClick={handleSignOutClick}>Sign out</Dropdown.Item>
        </SplitButton>

      </div>

      <main className="flex-grow overflow-y-auto app-bar">
        {isFetchingUsers ? (<div className='spinner' />) : (
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th><Form.Check onChange={handleAllCheckboxChange} checked={allUsersAreChecked()} /></th>
                  <th onClick={() => handleColumnClick('name')}>Name {renderSortIndicator('name')}</th>
                  <th onClick={() => handleColumnClick('email')}>Email {renderSortIndicator('email')}</th>
                  <th onClick={() => handleColumnClick('lastSeen')}>Last seen {renderSortIndicator('lastSeen')}</th>
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
                      <OverlayTrigger placement='top' container={document.body} overlay={<Tooltip>{moment(user.lastSeen).format('MMMM Do YYYY, k:mm:ss')}</Tooltip>}>
                        <div>
                          {moment(user.lastSeen).fromNow()}
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {fetchError && (<Alert variant='danger' className='m-3'>{fetchError}</Alert>)}

            {toastContainer()}
          </div>
        )}
      </main>


    </div>
  );
}

export default Dashboard;