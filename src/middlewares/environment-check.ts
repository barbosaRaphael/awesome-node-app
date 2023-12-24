const environmentCheck = (req, res, next) =>{
    res.locals.environment = {instance: process.env.ENVIRONMENT}
    next()
}

export default environmentCheck