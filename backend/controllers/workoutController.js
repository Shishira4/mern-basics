//database logic for all the routes
const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
//get all woirkouts
const getWorkouts = async(req, res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
//get single woekouts
const getSingleWorkout = async(req, res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such wokout'})
    }
    const workout =await Workout.findById(id)
    if(!workout)
    {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
//creare new workout
const createWorkout = async(req, res)=>{
    const {title, load, reps}=req.body
    //add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}
//delete a workpiut

//update a workout

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout
}