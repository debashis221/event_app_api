const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new group.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_Groups.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Group has been added.', groupId: inData.groupId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all group list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const grList = await model.TBL_Groups.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', groups: grList || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific group details.
router.get('/:groupId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const grData = await model.TBL_Groups.findOne({
            where: {
                groupId: req.params.groupId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', groups: grData || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific group data.
router.put('/:groupId', async(req, res) => {
    try {
        const grup = await model.TBL_Groups.update(req.body, {
            where: {
                groupId: req.params.groupId
            }
        });
        console.log(grup);
        res.json({ status: 200, response: 'success', msg: 'Group data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a group.
router.delete('/:groupId', async(req, res) => {
    try {
        const GroupDlt = await model.TBL_Groups.destroy({
            where: {
                groupId: req.params.groupId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Group has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;