import chalk from "chalk";

export const errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    console.log(chalk.red.inverse.bold(console.log({
        message: message,
        statusCode: statusCode        
    })))

    return res.status(statusCode).json({success: false, message: message})
}