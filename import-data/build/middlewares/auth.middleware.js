"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareOptions = void 0;
const config_utils_1 = require("../utils/config.utils");
/**
 * Configure Middleware. Example only. Adapt on your own
 */
exports.authMiddlewareOptions = {
    host: `https://auth.${(0, config_utils_1.readConfiguration)().region}.commercetools.com`,
    projectKey: (0, config_utils_1.readConfiguration)().projectKey,
    credentials: {
        clientId: (0, config_utils_1.readConfiguration)().clientId,
        clientSecret: (0, config_utils_1.readConfiguration)().clientSecret,
    },
    scopes: [
        (0, config_utils_1.readConfiguration)().scope
            ? (0, config_utils_1.readConfiguration)().scope
            : 'default',
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL2F1dGgubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx3REFBMEQ7QUFDMUQ7O0dBRUc7QUFDVSxRQUFBLHFCQUFxQixHQUEwQjtJQUMxRCxJQUFJLEVBQUUsZ0JBQWdCLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxNQUFNLG9CQUFvQjtJQUNwRSxVQUFVLEVBQUUsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDLFVBQVU7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsUUFBUSxFQUFFLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxRQUFRO1FBQ3RDLFlBQVksRUFBRSxJQUFBLGdDQUFpQixHQUFFLENBQUMsWUFBWTtLQUMvQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxLQUFLO1lBQ3ZCLENBQUMsQ0FBRSxJQUFBLGdDQUFpQixHQUFFLENBQUMsS0FBZ0I7WUFDdkMsQ0FBQyxDQUFDLFNBQVM7S0FDZDtDQUNGLENBQUMifQ==