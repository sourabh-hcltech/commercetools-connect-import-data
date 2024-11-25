"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const sdk_client_v2_1 = require("@commercetools/sdk-client-v2");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const http_middleware_1 = require("../middlewares/http.middleware");
const config_utils_1 = require("../utils/config.utils");
/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
const createClient = () => new sdk_client_v2_1.ClientBuilder()
    .withProjectKey((0, config_utils_1.readConfiguration)().projectKey)
    .withClientCredentialsFlow(auth_middleware_1.authMiddlewareOptions)
    .withHttpMiddleware(http_middleware_1.httpMiddlewareOptions)
    .build();
exports.createClient = createClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudHMvYnVpbGQuY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUE2RDtBQUM3RCxvRUFBdUU7QUFDdkUsb0VBQXVFO0FBQ3ZFLHdEQUEwRDtBQUUxRDs7O0dBR0c7QUFDSSxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FDL0IsSUFBSSw2QkFBYSxFQUFFO0tBQ2hCLGNBQWMsQ0FBQyxJQUFBLGdDQUFpQixHQUFFLENBQUMsVUFBVSxDQUFDO0tBQzlDLHlCQUF5QixDQUFDLHVDQUFxQixDQUFDO0tBQ2hELGtCQUFrQixDQUFDLHVDQUFxQixDQUFDO0tBQ3pDLEtBQUssRUFBRSxDQUFDO0FBTEEsUUFBQSxZQUFZLGdCQUtaIn0=