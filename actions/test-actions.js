export function doSomething(req, res, next) {
    res.status(200).json({});
}

export function doSomethingOtherMethod(req, res, next) {
    res.status(200).json({ test: 'info' });
}

// export function subdoSomethingOtherMethod(res, rej, next) {
//     res.status(200).json({});
// }