import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import ProfileService from "../services/profileService";
import pool from "../db";

cloudinary.config({
    cloud_name: "dgcjhgz00",
    api_key: "661143124343648",
    api_secret: "0cfqtxn2BbhpcGbFM8INzBraTV8",
});

export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    async EditUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.body;
            let data = await profileService.editUsername(username, req.user.userId);
            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    };

    async EditStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const {status} = req.body;
            let data = await profileService.editStatus(status, req.user.userId);
            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    };

    async EditImage(req: Request, res: Response, next: NextFunction) {
        try {
            await cloudinary.uploader.upload(req.body.image, function (error, result) {
                console.log(result, error);
            });
            return res.status(200).json();
        } catch (e) {
            next(e);
        }
    };

    async GetUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let data = await pool.query(
                "SELECT id, login, username, status FROM users"
            );
            res.json(data.rows);
        } catch (e) {
            next(e);
        }
    }

    async GetProfile(req: Request, res: Response, next: NextFunction) {
        try {
            let data = await pool.query(
                "SELECT id, login, username, status FROM users WHERE id = $1",
                [req.params.userId]
            );
            res.json(data.rows[0]);
        } catch (e) {
            next(e);
        }
    }
}

const profileController = new ProfileController(new ProfileService());
export default profileController;
