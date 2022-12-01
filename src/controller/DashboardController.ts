import {Response} from 'express'
import Error, {Message, StatusCode} from "../util/Error";
import {CustomRequest, JwtPayload} from "../middleware/auth/AuthMiddleware";
const activityModel = require('../models/activity')
const userModel = require('../models/user')
const dashboardModel = require('../models/dashboard')
const postModel = require('../models/post')

require('dotenv').config()

export class DashboardController {
    static getAllActivities = async (req: CustomRequest, res: Response) => {
        let activities: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try{
                activities = await activityModel.estimatedDocumentCount();
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else{
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(activities, StatusCode.E200, Message.OK));
    }

    static getAllUsers = async (req: CustomRequest, res: Response) => {
        let users: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try{
                users = await userModel.estimatedDocumentCount();
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else{
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(users, StatusCode.E200, Message.OK));
    }

    static getAllPosts = async (req: CustomRequest, res: Response) => {
        let posts: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try{
                posts = await postModel.estimatedDocumentCount();
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else{
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(posts, StatusCode.E200, Message.OK));
    }

    static getAllTasks = async (req: CustomRequest, res: Response) => {
        let tasks: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try {
                tasks = await dashboardModel.find({userId: id});
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else {
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(tasks, StatusCode.E200, Message.OK));
    }

    static createTask = async (req: CustomRequest, res: Response) => {
        let tasks: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try {
                const oldTasks = await dashboardModel.findOne({userId: id});
                if (oldTasks) {
                    tasks = await dashboardModel.findOneAndUpdate({userId: id}, {tasks: [...oldTasks.tasks, req.body.tasks]});
                } else {
                tasks = await dashboardModel.create({userId: id, tasks: req.body.tasks});
                }
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else {
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(tasks, StatusCode.E200, Message.OK));
    }

    static updateOneTask = async (req: CustomRequest, res: Response) => {
        let tasks: any
        if (req.userWithJwt?.isStaff) {
            const {id} = req.userWithJwt as JwtPayload
            try {
                const oldTasks = await dashboardModel.findOne({userId: id});
                let newTasks:any[] = []
                await Promise.all(oldTasks.tasks.map(async (task: any) => {
                    console.log(req.body.taskId, req.body.tasks)
                    if (task._id == req.body.taskId) {
                        task.task = req.body.task
                        task.dueDate = req.body.dueDate
                        task.isFinished = req.body.isFinished
                        task.finishedAt = req.body.finishedAt
                        task.createdAt = req.body.createdAt
                    }
                    newTasks.push(task)
                }))
                console.log(newTasks)
                tasks = await dashboardModel.findOneAndUpdate
                ({userId: id}, {tasks: newTasks});
                tasks = await dashboardModel.findOne({userId: id})
            } catch (e) {
                return res.status(StatusCode.E500).json(new Error(e, StatusCode.E500, Message.ErrFind))
            }
        } else {
            return res.status(StatusCode.E400).json(new Error(Message.NoAuth, StatusCode.E400, Message.NoAuth))
        }
        return res.status(200).json(new Error(tasks, StatusCode.E200, Message.OK));
    }


}