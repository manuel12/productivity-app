"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const cors_1 = require("cors");
const getTodos_1 = require("./routes/getTodos");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Get all todos
app.use(getTodos_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
