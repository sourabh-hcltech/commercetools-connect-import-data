"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const logger_utils_1 = require("../utils/logger.utils");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Create Categories message received');
    try {
        yield (0, categories_controller_1.importCategories)();
        res.send("importing categories successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = categoriesRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvY2F0ZWdvcmllcy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHFDQUFpQztBQUVqQyxnRkFBd0U7QUFDeEUsd0RBQStDO0FBRS9DLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFbEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLEVBQUU7SUFDOUMscUJBQU0sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUM7UUFDRCxNQUFNLElBQUEsd0NBQWdCLEdBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUlQLGtCQUFlLGdCQUFnQixDQUFDIn0=