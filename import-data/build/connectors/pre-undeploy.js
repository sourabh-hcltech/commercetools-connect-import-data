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
function preUndeploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiRoot = (0, create_client_js_1.createApiRoot)();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield preUndeploy();
        }
        catch (error) {
            process.stderr.write(`Pre-undeploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlLXVuZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nvbm5lY3RvcnMvcHJlLXVuZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTREO0FBRTVELFNBQWUsV0FBVzs7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQ0FBYSxHQUFFLENBQUM7SUFDbEMsQ0FBQztDQUFBO0FBRUQsU0FBZSxHQUFHOztRQUNoQixJQUFJLENBQUM7WUFDSCxNQUFNLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNoRSxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==