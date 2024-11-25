"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesService = exports.client = void 0;
const config_1 = require("../config");
const sdk_client_1 = require("@commercetools/sdk-client");
const sdk_middleware_auth_1 = require("@commercetools/sdk-middleware-auth");
const sdk_middleware_http_1 = require("@commercetools/sdk-middleware-http");
const api_request_builder_1 = require("@commercetools/api-request-builder");
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
exports.client = (0, sdk_client_1.createClient)({
    // The order of the middlewares is important !!!
    middlewares: [
        (0, sdk_middleware_auth_1.createAuthMiddlewareForClientCredentialsFlow)({
            host: config_1.config.authUrl,
            projectKey: config_1.config.projectKey,
            credentials: {
                clientId: config_1.config.clientId,
                clientSecret: config_1.config.clientSecret
            }
        }),
        (0, sdk_middleware_http_1.createHttpMiddleware)({ host: config_1.config.apiUrl, fetch })
    ]
});
const createCategories = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).categories;
exports.categoriesService = createCategories();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9jYXRlZ29yaWVzLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFtQztBQUNuQywwREFBeUQ7QUFDekQsNEVBQWtHO0FBQ2xHLDRFQUEwRTtBQUMxRSw0RUFBa0Y7QUFDbEYsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ2pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBRTVCLFFBQUEsTUFBTSxHQUFHLElBQUEseUJBQVksRUFBQztJQUNqQyxnREFBZ0Q7SUFDaEQsV0FBVyxFQUFFO1FBQ1gsSUFBQSxrRUFBNEMsRUFBQztZQUMzQyxJQUFJLEVBQUUsZUFBTSxDQUFDLE9BQU87WUFDcEIsVUFBVSxFQUFFLGVBQU0sQ0FBQyxVQUFVO1lBQzdCLFdBQVcsRUFBRTtnQkFDWCxRQUFRLEVBQUUsZUFBTSxDQUFDLFFBQVE7Z0JBQ3pCLFlBQVksRUFBRSxlQUFNLENBQUMsWUFBWTthQUNsQztTQUNGLENBQUM7UUFDRixJQUFBLDBDQUFvQixFQUFDLEVBQUUsSUFBSSxFQUFFLGVBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDckQ7Q0FDRixDQUFDLENBQUE7QUFFRixNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUM1QixJQUFBLDBDQUFvQixFQUFDLEVBQUUsVUFBVSxFQUFFLGVBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtBQUt2RCxRQUFBLGlCQUFpQixHQUFHLGdCQUFnQixFQUFFLENBQUEifQ==