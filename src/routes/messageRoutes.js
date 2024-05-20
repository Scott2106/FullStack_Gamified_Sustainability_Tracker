const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');

router.get('/', controller.readAllMessage);
router.post('/', controller.createMessage);
router.get('/:id', controller.readMessageById);
router.put('/:id', controller.updateMessageById);
router.delete('/:id', controller.deleteMessageById);

module.exports = router;