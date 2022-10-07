const express = require('express');
const router = express.Router();
const model = require('../../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new tab.
router.post('/', async(req, res) => {
    try {
        const inData = await model.TBL_Tabs.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Tab has been added.', tabId: inData.tabId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all tab list.
router.get('/', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const tabList = await model.TBL_Tabs.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', tabList: tabList || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific tab details.
router.get('/:tabId', async(req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const tabData = await model.TBL_Tabs.findOne({
            where: {
                tabId: req.params.tabId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', tabs: tabData || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific tab data.
router.put('/:tabId', async(req, res) => {
    try {
        const tab = await model.TBL_Tabs.update(req.body, {
            where: {
                tabId: req.params.tabId
            }
        });
        console.log(tab);
        res.json({ status: 200, response: 'success', msg: 'Tab data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a tab.
router.delete('/:tabId', async(req, res) => {
    try {
        const tabDlt = await model.TBL_Tabs.destroy({
            where: {
                tabId: req.params.tabId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Tab has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});


module.exports = router;