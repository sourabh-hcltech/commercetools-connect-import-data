import { client } from './services/categories.services';
import { SingleBar, Presets } from 'cli-progress';
import * as fs from 'fs';

const COOL_DOWN_PERIOD = Number(process.env.COOL_DOWN_PERIOD || 15) * 1000;
const MAX_ACTIVE = Number(process.env.MAX_ACTIVE || 25);
const RETRIES = Number(process.env.RETRIES || 5);

export const later = (howLong: number, value?: any): Promise<any> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), howLong)
  );

const promiseLike = (x: any): x is Promise<any> =>
  x !== undefined && typeof x.then === 'function';

const ifPromise = <T>(fn: (x: T) => any) => (x: T | Promise<T>): any =>
  promiseLike(x) ? x.then(fn) : fn(x);

export const createLimiter = (max: number = MAX_ACTIVE) => {
  let que: (() => void)[] = [];
  let queIndex = -1;
  let running = 0;

  const wait = (resolve: (value?: any) => void, fn: Function, arg: any) => () =>
    resolve(ifPromise(fn as (x: unknown) => any)(arg)) !== undefined || true;

    // resolve(ifPromise(fn)(arg)) !== undefined || true;
    // resolve(ifPromise(fn)(arg)) || true; // should always return true

  const nextInQue = (): string | void => {
    ++queIndex;
    if (typeof que[queIndex] === 'function') {
      return que[queIndex]();
    } else {
      que = [];
      queIndex = -1;
      running = 0;
      return 'Does not matter, not used';
    }
  };

  const queItem = (fn: Function, arg: any): Promise<any> =>
    new Promise((resolve) => que.push(wait(resolve, fn, arg)));

  return (fn: Function) => (arg: any) => {
    const p = queItem(fn, arg).then((x) => nextInQue() && x);
    running++;
    if (running <= max) {
      nextInQue();
    }
    return p;
  };
};

export const createRetry = (retries: number = RETRIES) => {
  const execute = (fn: Function, tries: number, args: any[]): Promise<any> =>
    Promise.resolve()
      .then(() => fn.apply(null, args))
      .catch((error) => {
        tries++;

        if (error.body && error.body.statusCode === 401) {
          throw error;
        }

        if (tries > retries) {
          throw error;
        }
        return later(COOL_DOWN_PERIOD).then(() =>
          execute(fn, tries, args)
        );
      });

  return (fn: Function) =>
    function retry(...args: any[]): Promise<any> {
      return execute(fn, 0, args);
    };
};

export const execute = createLimiter()(
  createRetry()(client.execute.bind(client))
);

export const getAll = (
  getterFn: Function,
  service: any
) => (
  request: any,
  statusCallback: (done: number, total: number) => void = (x) => x
): Promise<any[]> => {
  const limit = 100;
  const recur = (
    result: any[],
    getterFn: Function,
    service: any,
    goOn: boolean,
    lastId?: string | undefined,
    total?: number | undefined
  ): Promise<any[]> => {
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
    return getterFn({
      ...request,
      uri: uriBuilder.build(),
    }).then((response: any) => {
      const all = result.concat(response.body.results);
      statusCallback(all.length, total || response.body.total);
      return recur(
        all,
        getterFn,
        service,
        response.body.count === limit,
        response.body.results.slice(-1)[0]?.id,
        total || response.body.total
      );
    });
  };
  return recur([], getterFn, service, true);
};

export const NONE = {};

export const setBy = <T>(getter: (item: T) => any) => (items: T[]): Map<any, T> =>
  items.reduce((itemsMap, item) => itemsMap.set(getter(item), item), new Map());

export const setByKey = setBy((item: { key: any }) => item.key);

export const groupBy = <T>(getter: (item: T) => any) => (items: T[]): Map<any, T[]> =>
  items.reduce(
    (itemsMap, item) =>
      itemsMap.set(getter(item), (itemsMap.get(getter(item)) || []).concat(item)),
    new Map()
  );

export const readFile = (filePath: string, encoding: any = 'utf8'): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, encoding, (err: any, fileContent: any) =>
      err ? reject(err) : resolve(fileContent)
    )
  );

export const writeFile = (filePath: string, content: string): Promise<void> =>
  new Promise((resolve, reject) =>
    fs.writeFile(filePath, content, (err) =>
      err ? reject(err) : resolve()
    )
  );

export const readJson = (filePath: string, encoding: string = 'utf8'): Promise<any> =>
  readFile(filePath, encoding).then((fileContent) => JSON.parse(fileContent));

export const logAndExit = (error: any, message: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.error(
    `${message}, see import-error.log for more details`
  );
  const log = Object.keys(error).length
    ? JSON.stringify(error, undefined, 2)
    : JSON.stringify(
      { message: error.message, stack: error.stack },
      undefined,
      2
    );
  const exit = () => {
    process.exit(1);
  };
  return writeFile('import-error.log', log).then(exit, exit);
};

export const processAll = (
  getterFn: Function,
  service: any,
  request: any,
  processor: (x: any, total: number) => any = (x) => x
): Promise<any[]> => {
  const limit = 100;
  const recur = (
    result: any,
    getterFn: Function,
    service: any,
    goOn: boolean,
    lastId?: string | undefined,
    total?: number | undefined
  ): Promise<any[]> => {
    if (!goOn) {
      return result;
    }
    let uriBuilder =
      typeof service === 'function'
        ? service()
        : service
          .perPage(limit)
          .sort('id', true)
          .withTotal(total === undefined);
    if (lastId) {
      uriBuilder = uriBuilder.where(`id>"${lastId}"`);
    }
    const uri = uriBuilder.build();
    return getterFn({
      ...request,
      uri,
    }).then((response: any) => {
      return Promise.all(
        response.body.results.map((item: any) =>
          processor(item, total || response.body.total)
        )
      ).then((processed) => {
        const all = result.concat(processed);
        return recur(
          all,
          getterFn,
          service,
          response.body.count === limit,
          response.body.results.slice(-1)[0]?.id,
          total || response.body.total
        );
      });
    });
  };
  return recur([], getterFn, service, true);
};

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




const processWithNotify = (
  message: string,
  getterFn: Function,
  service: any,
  request: any,
  processor: (x: any, total: number) => any = (x) => x
): Promise<any[]> => {
  // Initialize notify as an instance of SingleBar
  let notify: SingleBar | null = null;
  let started = false;

  // Update the status of the progress bar
  const updateStatus = (done: number, total: number): void => {
    if (!started) {
      // Instantiate notify when starting the process
      notify = new SingleBar(
        {
          format: message,
          barCompleteChar: '\u2588', // Unicode block character for completed bar
          barIncompleteChar: '\u2591', // Unicode block character for incomplete bar
        },
        Presets.rect // Use the rectangular style preset
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
  return processAll(
    getterFn,
    service,
    request,
    (current, total) =>
      Promise.resolve()
        .then(() => processor(current, total))
        .then((result) => {
          updateStatus(++processed, total); // Update progress bar after processing
          return result;
        })
  ).then(
    (result) => {
      if (notify) {
        notify.stop(); // Stop the progress bar once processing is done
      }
      return result;
    },
    (err) => {
      if (notify) {
        notify.stop(); // Stop the progress bar in case of an error
      }
      return Promise.reject(err); // Reject the promise with the error
    }
  );
};

export const createStandardDelete = ({
  itemName,
  service,
  deleteFunction = (item: { id: string, version: string }) =>
    execute({
      uri: (typeof service === 'function' ? service() : service)
        .byId(item.id)
        .withVersion(item.version)
        .build(),
      method: 'DELETE',
    }),
}: {
  itemName: string;
  service: any;
  deleteFunction?: (item: { id: string; version: string }) => Promise<any>;
}) => () => {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', `Deleting ${itemName}`);
  const spaces = (amount: number) =>
    [...new Array(amount)].map(() => ' ').join('');
  return processWithNotify(
    `Delete ${itemName}${spaces(20 - itemName.length)}{bar} |` + '| {percentage}% || {value}/{total} items',
    execute,
    service,
    {
      method: 'GET',
    },
    deleteFunction
  ).catch((err) =>
    logAndExit(err, `Failed to delete ${itemName}`)
  );
};
