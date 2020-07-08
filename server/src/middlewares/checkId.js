export default (req, res, next) => {
    console.log("checkId");
    if(req.params._id !== 'undefined') {
        next();
    } else {
        res.status(400).json({errors: {global: 'Request have not id'}});
    }
}