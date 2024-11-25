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
exports.createStandardDelete = exports.processAll = exports.logAndExit = exports.readJson = exports.writeFile = exports.readFile = exports.groupBy = exports.setByKey = exports.setBy = exports.NONE = exports.getAll = exports.execute = exports.createRetry = exports.createLimiter = exports.later = void 0;
const categories_services_1 = require("./services/categories.services");
const cli_progress_1 = require("cli-progress");
const fs = __importStar(require("fs"));
const COOL_DOWN_PERIOD = Number(process.env.COOL_DOWN_PERIOD || 15) * 1000;
const MAX_ACTIVE = Number(process.env.MAX_ACTIVE || 25);
const RETRIES = Number(process.env.RETRIES || 5);
const later = (howLong, value) => new Promise((resolve) => setTimeout(() => resolve(value), howLong));
exports.later = later;
const promiseLike = (x) => x !== undefined && typeof x.then === 'function';
const ifPromise = (fn) => (x) => promiseLike(x) ? x.then(fn) : fn(x);
const createLimiter = (max = MAX_ACTIVE) => {
    let que = [];
    let queIndex = -1;
    let running = 0;
    const wait = (resolve, fn, arg) => () => resolve(ifPromise(fn)(arg)) !== undefined || true;
    // resolve(ifPromise(fn)(arg)) !== undefined || true;
    // resolve(ifPromise(fn)(arg)) || true; // should always return true
    const nextInQue = () => {
        ++queIndex;
        if (typeof que[queIndex] === 'function') {
            return que[queIndex]();
        }
        else {
            que = [];
            queIndex = -1;
            running = 0;
            return 'Does not matter, not used';
        }
    };
    const queItem = (fn, arg) => new Promise((resolve) => que.push(wait(resolve, fn, arg)));
    return (fn) => (arg) => {
        const p = queItem(fn, arg).then((x) => nextInQue() && x);
        running++;
        if (running <= max) {
            nextInQue();
        }
        return p;
    };
};
exports.createLimiter = createLimiter;
const createRetry = (retries = RETRIES) => {
    const execute = (fn, tries, args) => Promise.resolve()
        .then(() => fn.apply(null, args))
        .catch((error) => {
        tries++;
        if (error.body && error.body.statusCode === 401) {
            throw error;
        }
        if (tries > retries) {
            throw error;
        }
        return (0, exports.later)(COOL_DOWN_PERIOD).then(() => execute(fn, tries, args));
    });
    return (fn) => function retry(...args) {
        return execute(fn, 0, args);
    };
};
exports.createRetry = createRetry;
exports.execute = (0, exports.createLimiter)()((0, exports.createRetry)()(categories_services_1.client.execute.bind(categories_services_1.client)));
const getAll = (getterFn, service) => (request, statusCallback = (x) => x) => {
    const limit = 100;
    const recur = (result, getterFn, service, goOn, lastId, total) => {
        if (!goOn) {
            return Promise.resolve(result);
        }
        let uriBuilder = service
            .perPage(limit)
            .sort('id', true)
            .withTotal(total === undefined);
        if (lastId) {
            uriBuilder = uriBuilder.where(`id>"${lastId}"`);
        }
        return getterFn(Object.assign(Object.assign({}, request), { uri: uriBuilder.build() })).then((response) => {
            var _a;
            const all = result.concat(response.body.results);
            statusCallback(all.length, total || response.body.total);
            return recur(all, getterFn, service, response.body.count === limit, (_a = response.body.results.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id, total || response.body.total);
        });
    };
    return recur([], getterFn, service, true);
};
exports.getAll = getAll;
exports.NONE = {};
const setBy = (getter) => (items) => items.reduce((itemsMap, item) => itemsMap.set(getter(item), item), new Map());
exports.setBy = setBy;
exports.setByKey = (0, exports.setBy)((item) => item.key);
const groupBy = (getter) => (items) => items.reduce((itemsMap, item) => itemsMap.set(getter(item), (itemsMap.get(getter(item)) || []).concat(item)), new Map());
exports.groupBy = groupBy;
const readFile = (filePath, encoding = 'utf8') => new Promise((resolve, reject) => fs.readFile(filePath, encoding, (err, fileContent) => err ? reject(err) : resolve(fileContent)));
exports.readFile = readFile;
const writeFile = (filePath, content) => new Promise((resolve, reject) => fs.writeFile(filePath, content, (err) => err ? reject(err) : resolve()));
exports.writeFile = writeFile;
const readJson = (filePath, encoding = 'utf8') => (0, exports.readFile)(filePath, encoding).then((fileContent) => JSON.parse(fileContent));
exports.readJson = readJson;
const logAndExit = (error, message) => {
    // eslint-disable-next-line no-console
    console.error(`${message}, see import-error.log for more details`);
    const log = Object.keys(error).length
        ? JSON.stringify(error, undefined, 2)
        : JSON.stringify({ message: error.message, stack: error.stack }, undefined, 2);
    const exit = () => {
        process.exit(1);
    };
    return (0, exports.writeFile)('import-error.log', log).then(exit, exit);
};
exports.logAndExit = logAndExit;
const processAll = (getterFn, service, request, processor = (x) => x) => {
    const limit = 100;
    const recur = (result, getterFn, service, goOn, lastId, total) => {
        if (!goOn) {
            return result;
        }
        let uriBuilder = typeof service === 'function'
            ? service()
            : service
                .perPage(limit)
                .sort('id', true)
                .withTotal(total === undefined);
        if (lastId) {
            uriBuilder = uriBuilder.where(`id>"${lastId}"`);
        }
        const uri = uriBuilder.build();
        return getterFn(Object.assign(Object.assign({}, request), { uri })).then((response) => {
            return Promise.all(response.body.results.map((item) => processor(item, total || response.body.total))).then((processed) => {
                var _a;
                const all = result.concat(processed);
                return recur(all, getterFn, service, response.body.count === limit, (_a = response.body.results.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id, total || response.body.total);
            });
        });
    };
    return recur([], getterFn, service, true);
};
exports.processAll = processAll;
// const processWithNotify = (
//   message: string,
//   getterFn: Function,
//   service: any,
//   request: any,
//   processor: (x: any, total: number) => any = (x) => x
// ): Promise<any[]> => {
//   // let notify = { stop: (x: any = undefined) => x }; // Default value for x is undefined
//   // let notify = {
//   //   start: (total: number) => { /* your implementation */ },
//   //   stop: (x: any) => x,
//   //   update: (done: number) => { /* your implementation */ },
//   // };
//   let notify = { stop: (x: any) => x };
//   let started = false;
//   const updateStatus = (done: number, total: number): void => {
//     if (!started) {
//       notify = new SingleBar(
//         {
//           format: message,
//           barCompleteChar: '\u2588',
//           barIncompleteChar: '\u2591',
//         },
//         Presets.rect
//       );
//       notify.start(total);
//       started = true;
//     }
//     notify.stop(done);
//   };
//   let processed = 0;
//   return processAll(
//     getterFn,
//     service,
//     request,
//     (current, total) =>
//       Promise.resolve()
//         .then(() => processor(current, total))
//         .then((result) => {
//           updateStatus(++processed, total);
//           return result;
//         })
//   ).then(
//     (result) => {
//       notify.stop(undefined);
//       return result;
//     },
//     (err) => {
//       notify.stop(undefined);  // Provide the expected argument
//       return Promise.reject(err);
//     }
//   );
// };
const processWithNotify = (message, getterFn, service, request, processor = (x) => x) => {
    // Initialize notify as an instance of SingleBar
    let notify = null;
    let started = false;
    // Update the status of the progress bar
    const updateStatus = (done, total) => {
        if (!started) {
            // Instantiate notify when starting the process
            notify = new cli_progress_1.SingleBar({
                format: message,
                barCompleteChar: '\u2588', // Unicode block character for completed bar
                barIncompleteChar: '\u2591', // Unicode block character for incomplete bar
            }, cli_progress_1.Presets.rect // Use the rectangular style preset
            );
            notify.start(total, 0); // Start the progress bar with a total value
            started = true;
        }
        if (notify) {
            notify.update(done); // Update the progress bar with the current progress
        }
    };
    let processed = 0;
    // Process all items
    return (0, exports.processAll)(getterFn, service, request, (current, total) => Promise.resolve()
        .then(() => processor(current, total))
        .then((result) => {
        updateStatus(++processed, total); // Update progress bar after processing
        return result;
    })).then((result) => {
        if (notify) {
            notify.stop(); // Stop the progress bar once processing is done
        }
        return result;
    }, (err) => {
        if (notify) {
            notify.stop(); // Stop the progress bar in case of an error
        }
        return Promise.reject(err); // Reject the promise with the error
    });
};
const createStandardDelete = ({ itemName, service, deleteFunction = (item) => (0, exports.execute)({
    uri: (typeof service === 'function' ? service() : service)
        .byId(item.id)
        .withVersion(item.version)
        .build(),
    method: 'DELETE',
}), }) => () => {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', `Deleting ${itemName}`);
    const spaces = (amount) => [...new Array(amount)].map(() => ' ').join('');
    return processWithNotify(`Delete ${itemName}${spaces(20 - itemName.length)}{bar} |` + '| {percentage}% || {value}/{total} items', exports.execute, service, {
        method: 'GET',
    }, deleteFunction).catch((err) => (0, exports.logAndExit)(err, `Failed to delete ${itemName}`));
};
exports.createStandardDelete = createStandardDelete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQXdEO0FBQ3hELCtDQUFrRDtBQUNsRCx1Q0FBeUI7QUFFekIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0UsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztBQUUxQyxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFXLEVBQWdCLEVBQUUsQ0FDbEUsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUN0QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUMxQyxDQUFDO0FBSFMsUUFBQSxLQUFLLFNBR2Q7QUFFSixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQU0sRUFBcUIsRUFBRSxDQUNoRCxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7QUFFbEQsTUFBTSxTQUFTLEdBQUcsQ0FBSSxFQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQWlCLEVBQU8sRUFBRSxDQUNyRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUvQixNQUFNLGFBQWEsR0FB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