const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new userTypeCode.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_UserTypeCodes.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'User type code has been added.', userTypeCodeId: inData.userTypeCodeId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all userTypeCodes list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const userTypeCodeList = await model.TBL_UserTypeCodes.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', userTypeCode: userTypeCodeList || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific userTypeCode details.
router.get('/:userTypeCodeId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const userTypeCodeList = await model.TBL_UserTypeCodes.findOne({
            where: {
                userTypeCodeId: req.params.userTypeCodeId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', userTypeCode: userTypeCodeList || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific userTypeCode data.
router.put('/:userTypeCodeId', async(req, res) => {
    try {
        const userTypeCode = await model.TBL_UserTypeCodes.update(req.body, {
            where: {
                userTypeCodeId: req.params.userTypeCodeId
            }
        });
        console.log(userTypeCode);
        res.json({ status: 200, response: 'success', msg: 'User type code data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a userTypeCode.
router.delete('/:userTypeCodeId', async(req, res) => {
    try {
        const userTypeCodeDlt = await model.TBL_UserTypeCodes.destroy({
            where: {
                userTypeCodeId: req.params.userTypeCodeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'User type code has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;