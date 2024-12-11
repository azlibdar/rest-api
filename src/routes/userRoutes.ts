import { isAuthenticated, isOwner } from "../middleware";
import { deleteUser, getAllUsers, updateUserPassword } from "../controllers/users";
import express from "express";

export default (router: express.Router) => {
  router.get("/list-users", isAuthenticated, getAllUsers);
  router.delete("/delete-account/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/change-password/:id", isAuthenticated, isOwner, updateUserPassword);
};
