const express = require('express')
const router = express.Router();
const MenuItems = require('./../models/MenuItems.js'); 

router.post('/', async (req, res) =>{
    try {
      const data = req.body;
      const newMenu = new MenuItems(data);
      const savedMenu = await newMenu.save();
      console.log('menu saved successfully');
      res.status(200).json({success: true, data: savedMenu});
    } catch (error) {
      console.log("error occurred while saving menu", error);
      res.status(500).json({error: "internal server error"});
    }
  })
  
  router.get('/', async(req, res) => {
    try {
      const menuItems = await MenuItems.find();
      console.log("all menu items got fetched");
      res.status(200).json({success: true, data: menuItems});
    } catch (error) {
      console.log("menu items couldn't fetched", error);
      res.status(500).json({success: false, error: "internal server error"});    
    }
  })
  
  router.get('/:taste', async(req, res) => {
    try {
      const tasteType = req.params.taste;
      if(tasteType=="sweet" || tasteType=="spicy" || tasteType=="sour"){  
        const menuItems = await MenuItems.find({taste: tasteType})
        console.log(`${tasteType} menu items got fetched`);
        res.status(200).json({success: true, data: menuItems});
      }else{
        res.status(400).json({error: "invalid taste type"});
      }
    } catch (error) {
      console.log("menu items couldn't fetched", error);
      res.status(500).json({success: false, error: "internal server error"});    
    }
  })

  router.delete('/', async(req, res) => {
    try {
      const menuItem = await MenuItems.findByIdAndDelete(req.body);
      console.log("menu item got deleted");
      res.status(200).json({success: true, deletedItem: menuItem});
    } catch (error) {
      console.log("menu item couldn't get delete", error);
      res.status(500).json({success: false, error: "internal server error"});    
    }
  })
  
  router.patch('/:id', async(req, res) => {
    try {
      const menuId = req.params.id;
      const updateMenuData = req.body;
      const updatedData = await MenuItems.findByIdAndUpdate(menuId, updateMenuData, {new: true, runValidators: true} );
      if(!updatedData){
        res.status(404).json({error: "menu not found"});
      }
      console.log("menu item got updated");
      res.status(200).json({success: true, data: updatedData});
    } catch (error) {
      console.log("menu item couldn't get update", error);
      res.status(500).json({success: false, error: "internal server error"});    
    }
  })

  module.exports=router;