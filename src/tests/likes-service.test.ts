import {userTogglesTuitLikes, findAllTuitsLikedByUser, userLikesTuit}
    from "../services/likes-service"
import {userTogglesTuitDislikes, findAllTuitsDislikedByUser,}
    from "../services/dislikes-service"
import {
    createTuit,
    deleteTuitsByContent
} from "../services/tuits-service"
import {createUser, deleteUsersByUsername} from "../services/users-service"
/**
 * @jest-environment node
 */
describe('tuit likes', () => {
    const testUser = {
        username: 'testUser',
        password: 'mock',
        email: 'my@user.com'
    };


    const content = {
        tuit: "My test Tuit"
    };

    beforeAll(() => {
        deleteUsersByUsername(testUser.username);
        return deleteTuitsByContent(content.tuit);
    })

    afterAll(() => {
        deleteUsersByUsername(testUser.username);
        return deleteTuitsByContent(content.tuit);
    })

    test('toggle tuit likes', async () => {
        const user = await createUser(testUser);
        const tuit = await createTuit(user._id, content);


        expect(tuit.stats.likes).toEqual(0);
        await userTogglesTuitLikes(user._id, tuit._id);

        expect(tuit.stats.likes).toEqual(1);

        await userTogglesTuitLikes(user._id, tuit._id);

        expect(tuit.stats.likes).toEqual(0);
    });
});

describe('find all tuits liked by user', () => {
    const testUser = {
        username: 'testUser',
        password: 'mock',
        email: 'my@user.com'
    };

    const contentArray = ["Test Tuit 1", "Test Tuit 2"]

    beforeAll(() =>
        Promise.all(contentArray.map(tuit =>
            deleteTuitsByContent(tuit)
        ))
    );

    afterAll(() =>
        Promise.all(contentArray.map(tuit =>
            deleteTuitsByContent(tuit)
        ))
    );

    test('find all tuits that a user liked', async () => {
        const user = await createUser(testUser)
        const tuit1 = await createTuit(user._id, {tuit: contentArray[0]})
        const tuit2 = await createTuit(user._id, {tuit: contentArray[1]})

        await userTogglesTuitLikes(user._id, tuit1._id);
        await userTogglesTuitLikes(user._id, tuit2._id);

        const tuits = await findAllTuitsLikedByUser(user._id);

        expect(tuits.length).toBeGreaterThanOrEqual(contentArray.length);

        const tuitsWeInserted = tuits.filter(
            tuit => contentArray.indexOf(tuit.tuit) >= 0);

        tuitsWeInserted.forEach(tuit => {
            const content = contentArray.find(content => content === tuit.tuit);
            expect(tuit.tuit).toEqual(content);
        });

        deleteUsersByUsername(testUser.username)
    });
});

describe('tuit dislikes', () => {
    const testUser = {
        username: 'testUser',
        password: 'mock',
        email: 'my@user.com'
    };


    const content = {
        tuit: "My test Tuit"
    };

    beforeAll(() => {
        deleteUsersByUsername(testUser.username);
        return deleteTuitsByContent(content.tuit);
    })

    afterAll(() => {
        deleteUsersByUsername(testUser.username);
        return deleteTuitsByContent(content.tuit);
    })

    test('toggle tuit dislikes', async () => {
        const user = await createUser(testUser);
        const tuit = await createTuit(user._id, content);


        expect(tuit.stats.dislikes).toEqual(0);
        await userTogglesTuitDislikes(user._id, tuit._id);

        expect(tuit.stats.dislikes).toEqual(1);

        await userTogglesTuitDislikes(user._id, tuit._id);

        expect(tuit.stats.dislikes).toEqual(0);
    });
});

describe('find all tuits disliked by user', () => {
    const testUser = {
        username: 'testUser',
        password: 'mock',
        email: 'my@user.com'
    };

    const contentArray = ["Test Tuit 1", "Test Tuit 2"]

    beforeAll(() =>
        Promise.all(contentArray.map(tuit =>
            deleteTuitsByContent(tuit)
        ))
    );

    afterAll(() =>
        Promise.all(contentArray.map(tuit =>
            deleteTuitsByContent(tuit)
        ))
    );

    test('find all tuits that a user disliked', async () => {
        const user = await createUser(testUser)
        const tuit1 = await createTuit(user._id, {tuit: contentArray[0]})
        const tuit2 = await createTuit(user._id, {tuit: contentArray[1]})

        await userTogglesTuitDislikes(user._id, tuit1._id);
        await userTogglesTuitDislikes(user._id, tuit2._id);

        const tuits = await findAllTuitsDislikedByUser(user._id);

        expect(tuits.length).toBeGreaterThanOrEqual(contentArray.length);

        const tuitsWeInserted = tuits.filter(
            tuit => contentArray.indexOf(tuit.tuit) >= 0);

        tuitsWeInserted.forEach(tuit => {
            const content = contentArray.find(content => content === tuit.tuit);
            expect(tuit.tuit).toEqual(content);
        });

        deleteUsersByUsername(testUser.username)
    });
});
