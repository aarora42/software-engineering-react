import {createUser, deleteUsersByUsername, findUserById} from "../services/users-service";
import {
    createTuit,
    deleteTuit,
    findTuitById,
    findTuitByUser,
    deleteTuitsByUser,
    findAllTuits
} from "../services/tuits-service";
/**
 * @jest-environment node
 */
let ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

let newUser;


beforeAll(  async () => {
        newUser = await createUser(ripley);
    }
)

afterAll(
    () => {
        return deleteUsersByUsername(ripley.username);
    }
)

describe('can create tuit with REST API', () => {

    const sample = {
        tuit: 'sample tuit content'
    }
    let newTuitId;


    afterAll( () =>
        {
            return deleteTuit(newTuitId);
        }
    )

    test('can create tuit with REST API', async () => {
        const newTuit = await createTuit(newUser._id, sample);
        newTuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(sample.tuit);
    })
});

describe('can delete tuit wtih REST API', () => {
// sample tuit to delete
    const dTuit = {
        tuit: 'tuit to be deleted',
    };


    test('can delete tuit with REST API', async () => {
        // delete a tuit by its primary key
        const dTuitReal = await createTuit(newUser._id, dTuit);
        const status = await deleteTuit(dTuitReal._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const SamTuit = {
        tuit: 'Sam wrote this tuit',
    };


    test('can retrieve user from REST API by primary key', async () => {
        // insert the tuit in the database
        const newTuit = await createTuit(newUser._id, SamTuit);

        // verify new uit matches the parameter tuit
        expect(newTuit.tuit).toEqual(SamTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved user matches parameter user
        expect(existingTuit.tuit).toEqual(SamTuit.tuit);
    });
});

describe('can retrieve all tuits with REST API', () => {
    let tuitBody = [
        "testT", "testT2", "testT3"
    ];

    beforeAll(() => {
            return Promise.all(
                tuitBody.map(
                    sampleT =>
                        createTuit(newUser._id, {tuit: sampleT})
                ));
        }
    );

    afterAll( async () =>{
            const toBeDeleted = await findTuitByUser(newUser._id);
            return Promise.all(toBeDeleted.map(tuit =>
                deleteTuit(tuit._id)));
        }
    );

    test('can retrieve all tuits with REST API', async () => {
        const tuits = await findAllTuits();

        expect(tuits.length).toBeGreaterThanOrEqual(tuitBody.length);
        const inserted = tuits.filter(
            sampleT => tuitBody.indexOf(sampleT.tuit) >= 0);

        expect(inserted.length).toBeGreaterThanOrEqual(tuitBody.length);
        inserted.forEach(sampleT => {
            const tuitContent = tuitBody.find(
                (tuitContent) => tuitContent === sampleT.tuit
            );
            expect(sampleT.tuit).toEqual(tuitContent);
            expect(sampleT.postedBy).toEqual(newUser._id)
        });
    })
});


