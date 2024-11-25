"use strict";
// import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
// const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';
// export async function createCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder,
//   applicationUrl: string
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .extensions()
//     .post({
//       body: {
//         key: CART_UPDATE_EXTENSION_KEY,
//         destination: {
//           type: 'HTTP',
//           url: applicationUrl,
//         },
//         triggers: [
//           {
//             resourceTypeId: 'cart',
//             actions: ['Update'],
//           },
//         ],
//       },
//     })
//     .execute();
// }
// export async function deleteCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
// }
// export async function createCustomCartDiscountType(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: types },
//   } = await apiRoot
//     .types()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
//       },
//     })
//     .execute();
//   if (types.length > 0) {
//     const type = types[0];
//     await apiRoot
//       .types()
//       .withKey({ key: CART_DISCOUNT_TYPE_KEY })
//       .delete({
//         queryArgs: {
//           version: type.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .types()
//     .post({
//       body: {
//         key: CART_DISCOUNT_TYPE_KEY,
//         name: {
//           en: 'Custom type to store a string',
//         },
//         resourceTypeIds: ['cart-discount'],
//         fieldDefinitions: [
//           {
//             type: {
//               name: 'String',
//             },
//             name: 'customCartField',
//             label: {
//               en: 'Custom cart field',
//             },
//             required: false,
//           },
//         ],
//       },
//     })
//     .execute();
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3JzL2FjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtKQUFrSjtBQUVsSix1RUFBdUU7QUFDdkUsaUVBQWlFO0FBRWpFLG1EQUFtRDtBQUNuRCx5Q0FBeUM7QUFDekMsMkJBQTJCO0FBQzNCLHFCQUFxQjtBQUNyQixZQUFZO0FBQ1oscUNBQXFDO0FBQ3JDLHNCQUFzQjtBQUN0QixvQkFBb0I7QUFDcEIsYUFBYTtBQUNiLHFCQUFxQjtBQUNyQix5REFBeUQ7QUFDekQsV0FBVztBQUNYLFNBQVM7QUFDVCxrQkFBa0I7QUFFbEIsaUNBQWlDO0FBQ2pDLHVDQUF1QztBQUV2QyxvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLHFEQUFxRDtBQUNyRCxrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLHdDQUF3QztBQUN4QyxhQUFhO0FBQ2IsV0FBVztBQUNYLG9CQUFvQjtBQUNwQixNQUFNO0FBRU4sa0JBQWtCO0FBQ2xCLG9CQUFvQjtBQUNwQixjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLDBDQUEwQztBQUMxQyx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxhQUFhO0FBQ2Isc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZCxzQ0FBc0M7QUFDdEMsbUNBQW1DO0FBQ25DLGVBQWU7QUFDZixhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEIsSUFBSTtBQUVKLG1EQUFtRDtBQUNuRCx3Q0FBd0M7QUFDeEMscUJBQXFCO0FBQ3JCLFlBQVk7QUFDWixxQ0FBcUM7QUFDckMsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQixhQUFhO0FBQ2IscUJBQXFCO0FBQ3JCLHlEQUF5RDtBQUN6RCxXQUFXO0FBQ1gsU0FBUztBQUNULGtCQUFrQjtBQUVsQixpQ0FBaUM7QUFDakMsdUNBQXVDO0FBRXZDLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIscURBQXFEO0FBQ3JELGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIsd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYixXQUFXO0FBQ1gsb0JBQW9CO0FBQ3BCLE1BQU07QUFDTixJQUFJO0FBRUosc0RBQXNEO0FBQ3RELHdDQUF3QztBQUN4QyxxQkFBcUI7QUFDckIsWUFBWTtBQUNaLGdDQUFnQztBQUNoQyxzQkFBc0I7QUFDdEIsZUFBZTtBQUNmLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELFdBQVc7QUFDWCxTQUFTO0FBQ1Qsa0JBQWtCO0FBRWxCLDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFFN0Isb0JBQW9CO0FBQ3BCLGlCQUFpQjtBQUNqQixrREFBa0Q7QUFDbEQsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2QixtQ0FBbUM7QUFDbkMsYUFBYTtBQUNiLFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsTUFBTTtBQUVOLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2YsY0FBYztBQUNkLGdCQUFnQjtBQUNoQix1Q0FBdUM7QUFDdkMsa0JBQWtCO0FBQ2xCLGlEQUFpRDtBQUNqRCxhQUFhO0FBQ2IsOENBQThDO0FBQzlDLDhCQUE4QjtBQUM5QixjQUFjO0FBQ2Qsc0JBQXNCO0FBQ3RCLGdDQUFnQztBQUNoQyxpQkFBaUI7QUFDakIsdUNBQXVDO0FBQ3ZDLHVCQUF1QjtBQUN2Qix5Q0FBeUM7QUFDekMsaUJBQWlCO0FBQ2pCLCtCQUErQjtBQUMvQixlQUFlO0FBQ2YsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1Qsa0JBQWtCO0FBQ2xCLElBQUkifQ==