// import { Category as CtCategory} from '@commercetools/platform-sdk';
import { categoriesService } from '../services/categories.services';
import { execute, logAndExit, createStandardDelete } from '../helpers';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { logger } from '../utils/logger.utils';
dotenv.config();

// Define types for category-related objects
interface Category {
  key: string;
  externalId: string;
  parentId?: string;
  parent?: string;
  [key: string]: any; // to accommodate dynamic fields like 'name'
}

// Typing for grouped categories result
type GroupedCategories = Category[][];

// Typing for request configuration
interface Request {
  uri: string;
  method: string;
  body: Category;
}

// Typing for the result of Promise.all in saveRecursive
type SaveResult = Category[];

// Standard delete operation for categories
export const deleteAllCategories = createStandardDelete({
  itemName: 'categories',
  service: () => categoriesService.where('parent is not defined'),
});

// Helper function to map categories and set parent references
const setCategoryData = (category: Category): Category => ({
  ...category,
});

// Group categories by their parent-child relationships
const setParent = (categories: Category[]): Category[] => {
  const byExternalId = categories.reduce((result, category) =>
    result.set(category.externalId, category), new Map<string, Category>()
  );
  
  return Array.from(byExternalId.values()).map((category) => {
    const categoryCopy = setCategoryData(category);
    categoryCopy.parent = categoryCopy.parentId
      ? byExternalId.get(categoryCopy.parentId)?.key
      : undefined;
    delete categoryCopy.parentId;
    return categoryCopy;
  });
};

// Recursive function to group categories by parent
const groupByParent = (categories: Category[]): GroupedCategories => {
  const recur = (
    categories: Category[],
    map: Map<number, Category[]>,
    keys: (string | undefined)[],
    level: number
  ): Map<number, Category[]> => {
    if (!categories.length) {
      return map;
    }

    // Add children only AFTER a possible parent has been added
    categories.forEach((category) => {
      if (keys.includes(category.parent)) {
        map.set(level, map.get(level)?.concat(category) || []);
      }
    });

    const currentKeys = Array.from(map.values())
      .flat()
      .map((category) => category.key);

    // Recursively call with categories that are in the map removed
    return recur(
      categories.filter((category) => !currentKeys.includes(category.key)),
      map.set(level + 1, []), // set the next level
      currentKeys,
      level + 1
    );
  };

  return Array.from(
    recur(categories, new Map([[0, []]]), [undefined], 0).values()
  ).filter((categories) => categories.length); // filter out empty ones
};

// Save categories recursively
const saveRecursive = (groupedCategories: GroupedCategories): Promise<SaveResult> => {
  logger.info('Reached saveRecursive Method');
  const recur = (
    groupedCategories: GroupedCategories,
    index: number,
    result: SaveResult
  ): Promise<SaveResult> => {
    if (index === groupedCategories.length) {
      return Promise.resolve(result);
    }

    return Promise.all(
      groupedCategories[index].map((category) =>
        category.parent
          ? {
              ...category,
              parent: { key: category.parent }
            }
          : category
      ).map((category: any) => {
        const request: Request = {
          uri: categoriesService.build(),
          method: 'POST',
          body: category,
        };
        return execute(request);
      })
    ).then((result) =>
      recur(groupedCategories, index + 1, result.concat(result))
    );
  };

  return recur(groupedCategories, 0, []);
};

// Import categories from CSV
export const importCategories = (csvFilePath: string = '.src/data/categories.csv'): Promise<void> => {
  logger.info('Reached importCategories Method',csvFilePath);
  
  const resolvedPath = path.resolve(csvFilePath);
  
  return require('csvtojson')()
    .fromFile(resolvedPath)
    .then((rawJson: Category[]) =>
      saveRecursive(groupByParent(setParent(rawJson)))
    )
    .then(() =>
      console.log('Categories imported successfully')
    )
    .catch((err: Error) =>
      logAndExit(err, 'Failed to import categories')
    );
};

// Execute operations based on environment configuration (via dotenv)
// if (process.env.CLEAN === 'true') {
//   deleteAllCategories();
// } else if (process.env.IMPORT === 'true') {
  console.log('Importing categories...');
  importCategories('.src/data/categories.csv'); // CSV path can now be set via environment variable
// }
