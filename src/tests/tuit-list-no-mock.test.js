import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import {Tuit} from "../components/tuits/tuit";


test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bob tuit/i);
    expect(linkElement).toBeInTheDocument();
})