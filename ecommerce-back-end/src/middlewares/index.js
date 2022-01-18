const jwt = require("jsonwebtoken");



exports.requiresSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.APP_SECRET);
      req.user = user;
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
    //jwt.decode()
  };
  
  exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
      if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
      }
    }
    next();
  };
  
  exports.superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "super-admin") {
      return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
  };
  
  

// exports.requiresSignin = (req, res, next) => {
//     if(req.headers.authorization){
//         const token = req.headers.authorization.split(" ")[1];
//         const user = jwt.verify(token, process.env.APP_SECRET);
//         res.user = user;
//         next();
//     }else{
//         return res.status(400).json({ message: 'Authorization Required'})
//     }
//     next();
// }

// exports.userMiddleware = (req, res, next) => {
//     if(req.user.role !== 'user') {
//         return res.status(400).json({ message: 'User Access denied'})
//     }
//     next();
// }

// exports.adminMiddleware = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(400).json({ message: 'Admin Access denied'})
//     }
//     next();
// }