const express = require('express')
const router = express.Router();
const Person = require('./../models/Persons.js');

router.post('/', async (req, res)=>{
    try {
        // const newPerson = new Person();
        // newPerson.name = req.name;
        // newPerson.age = req.age;
        // newPerson.work = req.work;
        // newPerson.mobile = req.mobile;
        // newPerson.work = req.work;
        // newPerson.address = req.address;
        
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save()
    console.log("data saved successfully");
    res.status(200).json(savedPerson)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
})

router.get('/', async (req,res) => {
    try {
        const personsData = await Person.find();
        console.log("all persons data fetched");
        res.status(200).json(personsData);
    } catch (error) {
        console.log("Error In Finding All Persons: ", error);
        res.status(500).json({error: "internal server error"});
    }  
})


router.get('/:workType', async(req, res)=>{
    try {
        const workType = req.params.workType;
        if(workType=="chef" || workType=="owner" || workType=="manager"){
        const person = await Person.find({work: workType})
        console.log(`${workType} data fetched successfully`);
        res.status(200).json({success: true, data: person});
        }else{
        res.status(400).json({error: "invalid work type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
})

router.patch('/:id', async(req,res) =>{
    try {
        const personId = req.params.id;    
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        })
        if(!response){
            res.status(404).json({error: "person not found"});
        }
        console.log("data updated successfully");
        res.status(200).json({success: true, data: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
})

router.delete('/:id', async(req,res) =>{
    try {
        const personId = req.params.id;    
        const deletedPerson = await Person.findByIdAndDelete(personId)
        if(!deletedPerson){
            res.status(404).json({error: "person not found"});
        }
        console.log(` ${personId} data deleted successfully`);
        res.status(200).json({success: true, message:"person deleted successfully", deletedData: deletedPerson});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
})

module.exports = router;