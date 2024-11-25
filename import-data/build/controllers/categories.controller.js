"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCategories = exports.deleteAllCategories = void 0;
// import { Category as CtCategory} from '@commercetools/platform-sdk';
const categories_services_1 = require("../services/categories.services");
const helpers_1 = require("../helpers");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const logger_utils_1 = require("../utils/logger.utils");
dotenv.config();
// Standard delete operation for categories
exports.deleteAllCategories = (0, helpers_1.createStandardDelete)({
    itemName: 'categories',
    service: () => categories_services_1.categoriesService.where('parent is not defined'),
});
// Helper function to map categories and set parent references
const setCategoryData = (category) => (Object.assign({}, category));
// Group categories by their parent-child relationships
const setParent = (categories) => {
    const byExternalId = categories.reduce((result, category) => result.set(category.externalId, category), new Map());
    return Array.from(byExternalId.values()).map((category) => {
        var _a;
        const categoryCopy = setCategoryData(category);
        categoryCopy.parent = categoryCopy.parentId
            ? (_a = byExternalId.get(categoryCopy.parentId)) === null || _a === void 0 ? void 0 : _a.key
            : undefined;
        delete categoryCopy.parentId;
        return categoryCopy;
    });
};
// Recursive function to group categories by parent
const groupByParent = (categories) => {
    const recur = (categories, map, keys, level) => {
        if (!categories.length) {
            return map;
        }
        // Add children only AFTER a possible parent has been added
        categories.forEach((category) => {
            var _a;
            if (keys.includes(category.parent)) {
                map.set(level, ((_a = map.get(level)) === null || _a === void 0 ? void 0 : _a.concat(category)) || []);
            }
        });
        const currentKeys = Array.from(map.values())
            .flat()
            .map((category) => category.key);
        // Recursively call with categories that are in the map removed
        return recur(categories.filter((category) => !currentKeys.includes(category.key)), map.set(level + 1, []), // set the next level
        currentKeys, level + 1);
    };
    return Array.from(recur(categories, new Map([[0, []]]), [undefined], 0).values()).filter((categories) => categories.length); // filter out empty ones
};
// Save categories recursively
const saveRecursive = (groupedCategories) => {
    logger_utils_1.logger.info('Reached saveRecursive Method');
    const recur = (groupedCategories, index, result) => {
        if (index === groupedCategories.length) {
            return Promise.resolve(result);
        }
        return Promise.all(groupedCategories[index].map((category) => category.parent
            ? Object.assign(Object.assign({}, category), { parent: { key: category.parent } }) : category).map((category) => {
            const request = {
                uri: categories_services_1.categoriesService.build(),
                method: 'POST',
                body: category,
            };
            return (0, helpers_1.execute)(request);
        })).then((result) => recur(groupedCategories, index + 1, result.concat(result)));
    };
    return recur(groupedCategories, 0, []);
};
// Import categories from CSV
const importCategories = (csvFilePath = process.env.CSV_FILE_PATH || './data/categories.csv') => {
    logger_utils_1.logger.info('Reached importCategories Method', csvFilePath);
    const resolvedPath = path.resolve(csvFilePath);
    return require('csvtojson')()
        .fromFile(resolvedPath)
        .then((rawJson) => saveRecursive(groupByParent(setParent(rawJson))))
        .then(() => console.log('\x1b[32m%s\x1b[0m', 'Categories imported successfully'))
        .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import categories'));
};
exports.importCategories = importCategories;
// Execute operations based on environment configuration (via dotenv)
if (process.env.CLEAN === 'true') {
    (0, exports.deleteAllCategories)();
}
else if (process.env.IMPORT === 'true') {
    console.log('\x1b[32m%s\x1b[0m', 'Importing categories...');
    (0, exports.importCategories)(process.env.CSV_FILE_PATH); // CSV path can now be set via environment variable
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2NhdGVnb3JpZXMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUF1RTtBQUN2RSx5RUFBb0U7QUFDcEUsd0NBQXVFO0FBQ3ZFLCtDQUFpQztBQUNqQywyQ0FBNkI7QUFDN0Isd0RBQStDO0FBQy9DLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQXdCaEIsMkNBQTJDO0FBQzlCLFFBQUEsbUJBQW1CLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUN0RCxRQUFRLEVBQUUsWUFBWTtJQUN0QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsdUNBQWlCLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDO0NBQ2hFLENBQUMsQ0FBQztBQUVILDhEQUE4RDtBQUM5RCxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQWtCLEVBQVksRUFBRSxDQUFDLG1CQUNyRCxRQUFRLEVBQ1gsQ0FBQztBQUVILHVEQUF1RDtBQUN2RCxNQUFNLFNBQVMsR0FBRyxDQUFDLFVBQXNCLEVBQWMsRUFBRTtJQUN2RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBb0IsQ0FDdkUsQ0FBQztJQUVGLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTs7UUFDeEQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxD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