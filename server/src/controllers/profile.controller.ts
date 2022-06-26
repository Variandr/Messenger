import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import ProfileService from "../services/profile.service";
import pool from "../../config/database";

cloudinary.config({
  cloud_name: "dgcjhgz00",
  api_key: "661143124343648",
  api_secret: "0cfqtxn2BbhpcGbFM8INzBraTV8",
});

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  async EditUsername(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    const data = await this.profileService.editUsername(
      username,
      res.locals.user.userId
    );
    data ? res.status(200).json(data) : next();
  }

  async EditStatus(req: Request, res: Response, next: NextFunction) {
    const { status } = req.body;
    const data = await this.profileService.editStatus(
      status,
      res.locals.user.userId
    );
    data ? res.status(200).json(data) : next();
  }

  // TODO: Set image
  async EditImage(req: Request, res: Response, next: NextFunction) {
    await cloudinary.uploader.upload(
      req.body.image,
      function (error: Error, result: any) {}
    );
    next();
  }

  async GetUsers(req: Request, res: Response, next: NextFunction) {
    const data = await pool.query(
      "SELECT id, login, username, status FROM users"
    );
    data ? res.json(data.rows) : next();
  }

  async GetProfile(req: Request, res: Response, next: NextFunction) {
    const data = await pool.query(
      "SELECT id, login, username, status FROM users WHERE id = $1",
      [req.params.userId]
    );
    data ? res.json(data.rows[0]) : next();
  }
}

const profileController = new ProfileController(new ProfileService());
export default profileController;
