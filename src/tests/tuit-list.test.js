import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
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
