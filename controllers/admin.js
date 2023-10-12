const User = require("../models/User");
const asyncErrorWrapper = require('express-async-handler');

const blockOrUnblockUser = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.user;
    const {block} = req.params;
    const filter = {_id: id};
    const update = {blocked: block};
    const user = await User.findOneAndUpdate(filter, update, {
        new: true
    });

    message = user.blocked ? `${user.name} Block Successful` : `${user.name} Unblock Successful`;
    res.status(200).json({
        success: true,
        message: message
    });
});

module.exports = { blockOrUnblockUser };