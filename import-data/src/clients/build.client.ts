import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptions } from '../middlewares/auth.middleware';
import { httpMiddlewareOptions } from '../middlewares/http.middleware';
import { readConfiguration } from '../utils/config.utils';

/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
export const createClient = () =>
  new ClientBuilder()
    .withProjectKey(readConfiguration().projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
