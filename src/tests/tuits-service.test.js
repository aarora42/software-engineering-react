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
    // setup test before running test
    // beforeAll(() => {
    //     // remove any/all users to make sure we create it in the test
    //     return deleteUsersByUsername(ripley.username);
    // })

    // clean up after test runs
    afterAll( () =>
            // remove any data we created
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

    // setup the tests before verification
    // beforeAll(() => {
    //     // insert the sample user we then try to remove
    // });

    // clean up after test runs
    // afterAll(() => {
    //     // remove any data we created
    //     return deleteTuit(dTuit._id)
    // })

    test('can delete tuit with REST API', async () => {
        // delete a tuit by its primary key
        const dTuitReal = await createTuit(newUser._id, dTuit);
        const status = await deleteTuit(dTuitReal._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user we want to retrieve
    const SamTuit = {
        tuit: 'Sam wrote this tuit',
    };

    // setup before running test
    // beforeAll(() => {
    //     // clean up before the test making sure the user doesn't already exist
    //     return deleteTuit('1111');
    // });

    // clean up after ourselves
    // afterAll(() => {
    //     // remove any data we inserted
    //     return deleteTuit('1111');
    // });

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

    // sample tuits we'll insert to then retrieve
    const tuits = [
        "t1", "t2", "t3"
    ];

    // setup data before test
    beforeAll(() =>
        // insert several known users
        tuits.map(sampleT =>
            createTuit(newUser._id,{
                tuit: sampleT
            })
        )
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
            deleteTuitsByUser(newUser._id)

    );

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the users
        const newTuits = await findAllTuits();

        // there should be a minimum number of users
        expect(newTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each user we inserted
        const tuitsWeInserted = newTuits.filter(
            sampleT => tuits.indexOf(sampleT.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(sampleT => {
            const tuitContent = tuits.find(tuitContent => tuitContent === sampleT.tuit);
            expect(sampleT.tuit).toEqual(tuitContent);
            expect(sampleT.postedBy).toEqual(newUser._id);
        });
    });
});
