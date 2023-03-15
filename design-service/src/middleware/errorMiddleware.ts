// import { ErrorRequestHandler } from "express";
// import logger from "../services/loggerService";
// import { MyError } from "../helpers";

// export const ErrorMiddleWare: ErrorRequestHandler = (error, req, res, next) => {
//   const { statusCode, statusMessage } = res;
//   const { method, path, body, ip } = req;

//   if (error instanceof MyError) {
//     logger.error(error.message, error.errorObj);
//     logger.req(
//       "Server Error",
//       { method, path, body, ip },
//       { statusCode: 500, message: error.message }
//     );
//     return res
//       .status(500)
//       .send({ error: "Oops, an unexpected error occurred, please try again" });
//   } else {
//     return logger.req(
//       statusMessage,
//       { method, path, body, ip },
//       { statusCode, message: error }
//     );
//   }
// };
