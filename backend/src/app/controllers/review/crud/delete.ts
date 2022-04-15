import { Request, Response } from "express";
import Reviews from "../../../models/Review";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'id'" });
    }

    if (!req.user) {
      return res
        .status(403)
        .json({ error: "You must be logged in to delete a review" });
    }

    const review = await Reviews.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ error: `No such review with ID ${req.params.id} found` });
    }

    // Check that the user is an Admin, or the user owns the review
    if (
      !req.user.admin ||
      review.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        error: "You do not own this review to be capable of deleting it",
      });
    }

    await review.delete();
    return res.status(200).json({ "Successfully Deleted": review });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
