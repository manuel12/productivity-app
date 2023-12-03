"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../database");
const router = express_1.default.Router();
/* GET todos listing */
router.get("/api/todos/", function (req, res, next) {
    const querySQL = "SELECT * FROM Todo";
    const params = [];
    database_1.default.all(querySQL, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: "Todos successfully retrieved!",
            data: row,
        });
    });
});
exports.default = router;
