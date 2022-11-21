import express from "express";
import { HttpStatusCode } from "../../utilities/constants";
import { boardRoutes } from "./board.route";
import { cardRoutes } from "./card.route";
import { columnRoutes } from "./column.route";

const router = express.Router();

/*
  GET v1/status
*/

router.get("/status", (req, res) =>
  res.status(HttpStatusCode).json({ status: "OK" })
);

/**
 * Board APIs
 */
router.use("/boards", boardRoutes);

/**
 * Column APIs
 */
router.use("/columns", columnRoutes);

/**
 * Card APIs
 */
router.use("/cards", cardRoutes);

export const apiV1 = router;
