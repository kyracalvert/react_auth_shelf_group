const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "item".*, 
        "person"."username" as person
        FROM "item" JOIN "person" ON
        "person"."id" = "item"."person_id";`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
    // res.sendStatus(200); // For testing only, can be removed
});// end GET all items


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) {
        const query = `INSERT INTO "item" ("description", "image_url", "person_id") VALUES ($1, $2, $3);`;
        pool.query(query, [req.body.itemToAdd.description, req.body.itemToAdd.image_url, req.user.id])
            .then((results) => {
                res.sendStatus(201);
            }).catch((error) => {
                console.log('POST to db failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `DELETE FROM "item" WHERE "id" = $1;`;
        pool.query(query, [req.params.id]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
}); // end delete


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;