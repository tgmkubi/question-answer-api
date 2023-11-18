const asyncErrorWrapper = require('express-async-handler');
const { searchHelper, paginationHelper } = require('./queryMiddlewareHelpers');

const userQueryMiddleware = function (model) {
    return asyncErrorWrapper(async function (req, res, next) {
        //Initial Query
        let query = model.find();

        //Search
        query = searchHelper("name", query, req);

        //Pagination
        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        //Query
        const queryResults = await query;
        res.queryResults = {
            success: true,
            count: queryResults.length,
            pagination: pagination,
            data: queryResults
        }

        next();
    });
};

module.exports = userQueryMiddleware;