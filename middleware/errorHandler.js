export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    console.log('error ', {
        message: message,
        statusCode: statusCode
    });

    return res.status(statusCode).json({ success: false, message: message })
}