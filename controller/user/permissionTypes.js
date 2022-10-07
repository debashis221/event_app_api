const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new permissionType.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_PermissionTypes.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Permission Type has been added.', permissionTypeId: inData.permissionTypeId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all permissionType list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const permissionList = await model.TBL_PermissionTypes.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', permissionList: permissionList || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific permissionType details.
router.get('/:permissionTypeId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const permissionData = await model.TBL_PermissionTypes.findOne({
            where: {
                permissionTypeId: req.params.permissionTypeId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', permission: permissionData || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific permissionTypes data.
router.put('/:permissionTypeId', async(req, res) => {
    try {
        const permission = await model.TBL_PermissionTypes.update(req.body, {
            where: {
                permissionTypeId: req.params.permissionTypeId
            }
        });
        console.log(permission);
        res.json({ status: 200, response: 'success', msg: 'Permission data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a permissionTypes.
router.delete('/:permissionTypeId', async(req, res) => {
    try {
        const permissionDlt = await model.TBL_PermissionTypes.destroy({
            where: {
                permissionTypeId: req.params.permissionTypeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Permission has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;