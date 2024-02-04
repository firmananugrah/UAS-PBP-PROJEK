import express from "express";
import userController from "../controller/user-controller.js";
import makananController from "../controller/makanan-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// makanan API
userRouter.post('/api/makanans', makananController.create);
userRouter.get('/api/makanans/:makananId', makananController.get);
userRouter.put('/api/makanans/:makananId', makananController.update);
userRouter.delete('/api/makanans/:makananId', makananController.remove);
userRouter.get('/api/makanans', makananController.search);

export {
    userRouter
}