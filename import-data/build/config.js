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
exports.config = void 0;
// import * as nconf from 'nconf';
const dotenv = __importStar(require("dotenv"));
class Configuration {
    constructor() {
        this.config = {}; // Type assertion to initialize an empty config
        this.init();
    }
    // Initialize the configuration
    init() {
        this.load();
        this.print();
    }
    // Load configuration from environment variables
    load() {
        dotenv.config(); // Load environment variables from .env file
        // nconf.use('argv').nconf.argv().env(); // Load from command-line arguments and environment variables
        // Required keys can be checked if needed (uncomment the line below)
        // nconf.required(['projectKey', 'clientId', 'clientSecret', 'authUrl', 'apiUrl']);
        // Assign values to config from environment variables
        this.config = {
            projectKey: process.env.CTP_PROJECT_KEY,
            clientId: process.env.CTP_CLIENT_ID,
            clientSecret: process.env.CTP_CLIENT_SECRET,
            authUrl: process.env.CTP_AUTH_URL,
            apiUrl: process.env.CTP_API_URL,
            csvFilePath: process.env.CSV_FILE_PATH,
        };
    }
    // Print the configuration details
    print() {
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
        // eslint-disable-next-line no-console
        console.log('projectKey: ' + this.config.projectKey);
        // eslint-disable-next-line no-console
        console.log('clientId: ' + this.config.clientId);
        // eslint-disable-next-line no-console
        console.log('clientSecret: ' + this.config.clientSecret);
        // eslint-disable-next-line no-console
        console.log('authUrl: ' + this.config.authUrl);
        // eslint-disable-next-line no-console
        console.log('apiUrl: ' + this.config.apiUrl);
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
    }
    // Return the configuration object
    data() {
        return this.config;
    }
}
// Create an instance of Configuration and export the data
exports.config = new Configuration().data();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFrQztBQUNsQywrQ0FBaUM7QUFhakMsTUFBTSxhQUFhO0lBR2pCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFZLENBQUMsQ0FBQywrQ0FBK0M7UUFDM0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtCQUErQjtJQUMvQixJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGdEQUFnRDtJQUNoRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsNENBQTRDO1FBQzdELHNHQUFzRztRQUV0RyxvRUFBb0U7UUFDcEUsbUZBQW1GO1FBRW5GLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1osVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtZQUN2QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1lBQ25DLFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtZQUMzQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO1lBQ2pDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7WUFDL0IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYTtTQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFrQztJQUNsQyxLQUFLO1FBQ0gsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUN4RSxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQUVELDBEQUEwRDtBQUM3QyxRQUFBLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDIn0=