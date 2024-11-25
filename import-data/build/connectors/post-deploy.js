"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_js_1 = require("../clients/create.client.js");
function postDeploy(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiRoot = (0, create_client_js_1.createApiRoot)();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = new Map(Object.entries(process.env));
            yield postDeploy(properties);
        }
        catch (error) {
            process.stderr.write(`Post-deploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1kZXBsb3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29ubmVjdG9ycy9wb3N0LWRlcGxveS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtFQUE0RDtBQUU1RCxTQUFlLFVBQVUsQ0FBQyxVQUFlOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFBLGdDQUFhLEdBQUUsQ0FBQztJQUVsQyxDQUFDO0NBQUE7QUFFRCxTQUFlLEdBQUc7O1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUUsQ0FBQyJ9