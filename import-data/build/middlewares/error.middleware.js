"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const errorMiddleware = (error, _, res, _next) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (error instanceof custom_error_1.default) {
        res.status(error.statusCode).json({
            message: error.message,
            errors: error.errors,
            stack: isDevelopment ? error.stack : undefined,
        });
        return;
    }
    res
        .status(500)
        .send(isDevelopment
        ? { messge: error.message }
        : { message: 'Internal server error' });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9lcnJvci5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDBFQUFpRDtBQUUxQyxNQUFNLGVBQWUsR0FBd0IsQ0FDbEQsS0FBWSxFQUNaLENBQVUsRUFDVixHQUFhLEVBQ2IsS0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQztJQUU3RCxJQUFJLEtBQUssWUFBWSxzQkFBVyxFQUFFLENBQUM7UUFDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDL0MsQ0FBQyxDQUFDO1FBRUgsT0FBTztJQUNULENBQUM7SUFFRCxHQUFHO1NBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNYLElBQUksQ0FDSCxhQUFhO1FBQ1gsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDM0IsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQ3pDLENBQUM7QUFDTixDQUFDLENBQUM7QUF6QlcsUUFBQSxlQUFlLG1CQXlCMUIifQ==