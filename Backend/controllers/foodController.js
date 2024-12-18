
import foodModle from "../models/foodModel.js"
import fs from 'fs'



const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModle({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  })
  try {
    await food.save();
    res.json({ success:true, massage: "food Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, massage: "Failed to add food" })
  }



}
// all food list food
const listFood = async (req, res) => {
  try{
  const foods =await foodModle.find({});
  res.json({success:true, data:foods})
  }catch (error){
    console.log(error);
    res.json({ success: false, massage: "Failed to get food list" })
  }
  
  }


  //remove food item
  const removeFood = async (req, res) => {
    try {
      const food = await foodModle.findById(req.body.id);
      if (food) {
        fs.unlink(`uploads/${food.image}`, () => {}); // Delete the image file
        await foodModle.findByIdAndDelete(req.body.id); // Delete the food document
        res.json({ success: true, message: 'Food removed' });
      } else {
        res.json({ success: false, message: 'Food not found' });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Failed to remove food' });
    }
  };
  
export { addFood ,listFood,removeFood}





