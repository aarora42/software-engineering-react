import Tuits from "../components/tuits/";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'alice', _id:'1'},
    {username: 'bob', _id:'2'},
    {username: 'charlie', _id:'3'}
];

const MOCKED_TUITS = [
    {tuit:"alice's tuit", postedBy:MOCKED_USERS[0]._id, _id:'1'},
    {tuit:"bob's tuit", PostedBy:MOCKED_USERS[1]._id, _id:'2' },
    {tuit:"charlie's tuit", PostedBY:MOCKED_USERS[2]._id, _id:'3'}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});


test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
          <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
  });
