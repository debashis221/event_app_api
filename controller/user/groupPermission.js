const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new groupPermission.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_GroupPermissions.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Group permission has been added.', groupPermissionId: inData.groupPermissionId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all groupPermission list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const groupPermissionList = await model.TBL_GroupPermissions.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', groupPermissions: groupPermissionList || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific groupPermission details.
router.get('/:groupPermissionId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const groupPermissionList = await model.TBL_GroupPermissions.findOne({
            where: {
                groupPermissionId: req.params.groupPermissionId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', groupPermission: groupPermissionList || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific groupPermission data.
router.put('/:groupPermissionId', async(req, res) => {
    try {
        const groupPermission = await model.TBL_GroupPermissions.update(req.body, {
            where: {
                groupPermissionId: req.params.groupPermissionId
            }
        });
        console.log(groupPermission);
        res.json({ status: 200, response: 'success', msg: 'Group permission data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a groupPermission.
router.delete('/:groupPermissionId', async(req, res) => {
    try {
        const groupPermissionDlt = await model.TBL_GroupPermissions.destroy({
            where: {
                groupPermissionId: req.params.groupPermissionId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Group permission has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;