
import { Router } from 'express';

import { importCategories } from '../controllers/categories.controller';
import { logger } from '../utils/logger.utils';

const categoriesRouter = Router();

categoriesRouter.post('/', async(req, res, next)=>{
    logger.info('Create Categories message received');
    try {
        await importCategories(process.env.CSV_FILE_PATH);
        res.send("importing categories successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default categoriesRouter;

