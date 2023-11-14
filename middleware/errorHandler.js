import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  res.status(500).json({error: {message, statusCode}});
}

export default errorHandler;