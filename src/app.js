const express = require("express");
 require("./db/conn");
 const body = require("body-parser");
 const Hotel_owner  = require("./models/Hotels_owner");
 const Hotel_Work  = require("./models/hotels_work");
 const  Product = require("./models/Product");
 const Restroant_Work = require("./models/Restaurant_work");
 const Property  = require("./models/Hotels");
 const restro_property = require("./models/Restaurant");
 const Social = require("./models/Socials");
 const country = require("./models/Country");
 const Social_restaurant = require("./models/Socials_two");
 const Admin = require("./models/Admin");
 const Company = require("./models/company");
 const Task =require("./models/All_Tasks");
 const bcrypt = require("bcrypt");
 const multer = require('multer');
 const cloudinary = require('cloudinary').v2
 //var upload = multer({dest: 'uploads/'});
 const app = express();
 
 const PORT = process.env.PORT || 4443;
 app.use(express.json());
 app.use(body.json());


 cloudinary.config({
  cloud_name: "dvmtyet5d",
  api_key: "948767335664658",
  api_secret: "2RlX14MQ5d0VwevgIXHmlY7eNnI"
})

 //const multer = require('multer');
 const storage = multer.diskStorage({
     filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname)
     }
   });
 const upload = multer({ storage: storage });

//Post img in property
 app.post('/property', upload.fields([{ name: 'hotel_logo', maxCount: 1 }, { name: 'Cover_photo', maxCount: 1 }]), async (req, res) => {
  try{
  const { owner_id, trip_advisor_review, Google_review, hotel_name, hotel_stars, About, Address, Country } = req.body;

  //const { profileImage, backgroundImage } = req.files;
  
  // Upload images to Cloudinary
  const hotel_logo = await cloudinary.uploader.upload(req.files['hotel_logo'][0].path)
  const Cover_photo = await cloudinary.uploader.upload(req.files['Cover_photo'][0].path)

  const user = new Property({
    
    owner_id,
    trip_advisor_review,
    Google_review,
    hotel_name,
    hotel_stars,
    About,
    Address,
    Country,
    hotel_logo: hotel_logo.secure_url,
    Cover_photo: Cover_photo.secure_url
  });

  
    const savedUser = await user.save();
    res.status(201).json(savedUser)
    //res.status(201).json({message: "property added successfully"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

  
//post img in hotelowner
app.post('/hotelowner', upload.fields([{ name: 'Profile_photo', maxCount: 1 }, { name: 'Cover_photo', maxCount: 1 }]), async (req, res) => {
  try{
  const { Name, Email, Password, Phone, Country, Service_type } = req.body;
 // const { profileImage, backgroundImage } = req.files;
 const Profile_photo = await cloudinary.uploader.upload(req.files['Profile_photo'][0].path)
  const Cover_photo = await cloudinary.uploader.upload(req.files['Cover_photo'][0].path)

  const user = new Hotel_owner({
    
    Name,
    Email,
    Password,
    Phone,
    Country,
    Service_type,
    Profile_photo: Profile_photo.secure_url,
    Cover_photo: Cover_photo.secure_url
  });

  
    const savedUser = await user.save();
    res.status(201).json({message: "Owner added successfully"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});










//Get  task using date
// app.get('/task/:Date', (req, res) => {
//   Task.find({ Date: req.params.Date })
//       .then(document => res.json(document))
//       .catch(err => res.status(404).json({ success: false }));
// });

//Post All_task
app.post('/tasks',(req,res)=>{
  const comp = new Task(req.body);
  comp.save((error)=>{
    if (error){
      res.status(500).send(error);
    } else{
      res.send(comp);
    }
  });
});

//Get All_task
app.get('/tasks', (req, res) => {
  Task.find({}, (error, comp) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(comp);
    }
  });
});
//Get task using hotel_id
// app.get('/tasks/:hotel_id', (req, res) => {
//   Task.findOne({ hotel_id: req.params.hotel_id })
//       .then(document => res.json(document))
//       .catch(err => res.status(404).json({ success: false }));
// });

//Compant login
// app.post("/companylogin",(req,res)=>{
//   const{Email,Password}=req.body
//   Company.findOne({Email:Email},(error,user)=>{
//       if(user){
//           if(Password ===user.Password){
//               res.send({message:"login successfull"})
//           }else{
//               res.send({message:"password didnot match"})
//           }
          
//       }else{
//           res.send({message:"not registerd"})
//       }
//   })
  
// })
//Login
app.post("/login", (req, res) => {
  const { Email, Password } = req.body
  Hotel_owner.findOne({ Email: Email }, (error, user) => {
      if (user) {
          if (Password === user.Password) {
            var owner_id=user.owner_id;
              res.send({ message: "owner login successfull",owner_id})

          } else {

              res.send({ message: "pls check your email and password" })
          }
      } else if (!user) {
          const { Email, Password } = req.body
          Admin.findOne({ Email: Email }, (error, data) => {
              if (data) {
                  if (Password === data.Password) {
                      res.send({ message: "Admin login successfull " })
                  } else {

                      res.send({ message: "pls check your email and password" })
                  }
              } else if (!data) {
                  const { Email, Password } = req.body
                  Company.findOne({ Email: Email }, (error, com) => {
                      if (com) {
                          if (Password === com.Password) {
                              res.send({ message: "company login successfull " })
                          } else {

                              res.send({ message: "pls check your email and password" })
                          }
                      }else{
                          res.send({ message: "pls check your email and password" })
                      }
                  })
              }
          })
      }
  })
})





 // company post api
 app.post('/company', async (req, res) => {
  try {
      const prevDoc = await Company.findOne({}).sort({ _id: -1 });
      
      if (prevDoc.token !== req.body.token) {
          return res.status(400).json({ message: 'invalid data' });            
      }
              const myDoc = new Company({
          token: req.body.token + 1,
          Name: req.body.Name,
          Email: req.body.Email,
          Password: req.body.Password,
          Phone_no: req.body.Phone_no,
          Profile_photo: req.body.Profile_photo,
          User_id: req.body.User_id
      });
      const newDoc = await myDoc.save();
      res.status(201).json(newDoc);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});
 

//company data
app.get('/company', (req, res) => {
  Company.find({}, (error, comp) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(comp);
    }
  });
});

//Post adminlogin
// app.post("/adminlogin",(req,res)=>{
//   const{Email,Password}=req.body
//   Admin.findOne({Email:Email},(error,user)=>{
//       if(user){
//           if(Password ===user.Password){
//               res.send({message:"login successfull"})
//           }else{
//               res.send({message:"password didnot match"})
//           }
          
//       }else{
//           res.send({message:" not registerd"})
//       }
//   })
//   //res.send("My api login")
// })

 //Post Admin
 app.post('/adminsignup',(req,res)=>{
const al = new Admin(req,res);
al.save((error)=>{
  if(error){
    res.status(500).send(error)
  }
  else{
    res.send(al)
  }
  })
});

//Get Admin
app.get('/adminlogin',(req,res)=> {
  Admin.find({}, (error, al)=>{
      if(error){
          res.status(500).send(error)
      }
      else{
          res.send(al);
      }
  })
});



//Post country
app.post("/Country",(req,res)=>{
  const hm = new country(req.body);
  hm.save((error)=>{
      if (error){
          res.send(500).send(error)
      }
      else{
          res.send(hm)
      }
  })
});

//Get country
app.get('/country', (req, res) => {
  country.find({}, (error, blogposts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(blogposts);
    }
  });
});









 //Post Hotels_work
 app.post("/hotelwork",(req,res)=>{
  const hm = new Hotel_Work(req.body);
  hm.save((error)=>{
      if (error){
          res.status(500).send(error)
      }
      else{
          res.send(hm)
      }
  })
});

//Get Hotels_work
app.get('/hotelwork', (req, res) => {
  Hotel_Work.find({}, (error, blogposts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(blogposts);
    }
  });
});



 //socials_two Post
 app.post('/Social_media', (req, res) => {
  const blogpost = new Social_restaurant(req.body);
  blogpost.save((error) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(blogpost);
      }
  });
});
 
//socials_two Get
app.get('/Social_media', (req, res) => {
  Social_restaurant.find({}, (error, blogposts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(blogposts);
    }
  });
});


//Get Restaurant social_two using owner id
app.get('/Social_media/:owner_id', (req, res) => {
  Social_restaurant.findOne({ owner_id: req.params.owner_id })
      .then(document => res.json(document))
      .catch(err => res.status(404).json({ success: false }));
});


//Post Restaurant_work
app.post("/Restro_work",(req,res)=>{
  const hm = new Restroant_Work(req.body);
  hm.save((error)=>{
      if (error){
          res.status(500).send(error)
      }
      else{
          res.send(hm)
      }
  })
});

//Get Restaurant_work
app.get('/Restro_work', (req, res) => {
  Restroant_Work.find({}, (error, blogposts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(blogposts);
    }
  });
});


//Get Restaurant_work using owner id
app.get('/Restro_work/:owner_id', (req, res) => {
  Restroant_Work.findOne({ owner_id: req.params.owner_id })
      .then(document => res.json(document))
      .catch(err => res.status(404).json({ success: false }));
});





 //Restaurant Post
 app.post('/restro_property', (req, res) => {
  const blogpost = new restro_property(req.body);
  blogpost.save((error) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(blogpost);
      }
  });
});
 

 //Restaurant Get
 app.get('/restro_property', (req, res) => {
  restro_property.find({}, (error, blogposts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(blogposts);
    }
  });
});
 
//Restaurant Get by using ownerid
app.get('/restro_property/:owner_id', (req, res) => {
  restro_property.findOne({ owner_id: req.params.owner_id })
      .then(document => res.json(document))
      .catch(err => res.status(404).json({ success: false }));
});


//Social media Post
app.post('/social',(req,res)=>{
  const sm = new Social(req.body);
  sm.save((error)=>{
    if (error){
      res.status(500).send(error);
    } else{
      res.send(sm);
    }
  });
});

//Social media get
app.get('/social', (req, res) => {
  Social.find({}, (error, sm) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(sm);
    }
  });
});

//Get social using ownerid
//Restaurant Get by using ownerid
app.get('/social/:owner_id', (req, res) => {
  Social.findOne({ owner_id: req.params.owner_id })
      .then(document => res.json(document))
      .catch(err => res.status(404).json({ success: false }));
});

//Property_hotel
app.post('/property', (req, res) => {
  const blogpost = new Property(req.body);
  blogpost.save((error) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(blogpost);
      }
  });
});

//Property_hotel
app.get('/property', (req, res) => {
  Property.find({}, (error, blogposts) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(blogposts);
      }
  });
});

//Get owner_id hotels
app.get('/property/:owner_id', (req, res) => {
  Property.findOne({ owner_id: req.params.owner_id })
      .then(document => res.json(document))
      .catch(err => res.status(404).json({ success: false }));
});


// post hotel_owner using login
// app.post("/ownerlogin",(req,res)=>{
//   const{Email,Password}=req.body
//   Hotel_owner.findOne({Email:Email},(error,user)=>{
//       if(user){
//           if(Password ===user.Password){
//               res.send({message:"login successfull"})
//           }else{
//               res.send({message:"password didnot match"})
//           }
          
//       }else{
//           res.send({message:" not registerd"})
//       }
//   })
//   //res.send("My api login")
// })


//Post hotel_owner
app.post('/Hotel_owner', (req, res) => {
  const blogpost = new Hotel_owner(req.body);
  if(req.body.token=="abc123"){
      blogpost.save()
      res.send(blogpost)
  } else{
      
      res.send("pls enter token babar se dalo")
           
      
  }
  
});
//app.post('/Hotel_owner', (req, res) => {
  //  const blogpost = new Hotel_owner(req.body);
   // blogpost.save((error) => {
     // if (error) {
       // res.status(500).send(error);
      //} else {
        //res.send(blogpost);
      //}
    //});
  //});


  //Get
  app.get('/Hotel_owner', (req, res) => {
    Hotel_owner.find({}, (error, blogposts) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(blogposts);
      }
    });
  });
  

//GEt Hotel_owner using owner_id 
//  app.get('/Hotel_owner12/:owner_id', (req, res) => {
//    Hotel_owner.findOne({ owner_id: req.params.owner_id })
//       .then(document => res.json(document))
//       .catch(err => res.status(404).json({ success: false }));
//  });





//
//get specific data from 
// app.get('/hotel_owner/:Country', async (req, res) => {
//   let data = await Hotel_owner.find({
//       "$or": [{Country: {$regex:req.params.Country}}]
      
//   })

//   res.send(data)
//   });


//Update task
//   app.patch("/task/:id",async(req,res)=>{
//     try{
//        const id=req.params.id; 
//       const updatetask = await  Task.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//       res.send({ message: "task update successfully" })
 
//     }catch(error){
//       res.status(400).send("something wrong");
 
//     }
//  })

//update Property
// app.patch("/property/:id",async(req,res)=>{
//   try{
//      const id=req.params.id; 
//     const updateproperty = await  Property.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//     res.send({ message: "property update successfully" })

//   }catch (err) {
//     //console.error(err);
//     res.status(500).send('Something wrong');
//   }
// })

//update Hotel_owner

//update Scoial
// app.patch("/social/:id",async(req,res)=>{
//   try{
//      const id=req.params.id; 
//     const updatesocial = await  Social.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//     res.send({ message: "social update successfully" })

//   }catch(e){
//      res.status(404).send("something wrong");

//   }
// })


//Get task using status
// app.get('/task1/:Status', async (req, res) => {
//   let data = await Task.find({
//       "$or": [{Status: {$regex:req.params.Status}}]
      
//   })
//   res.send(data)
//   });




//get tasks using date or hotelid or status
app.get('/tasks/:key/:key1', async (req, res) => {

  let data = await Task.find({
  
    "$or": [
      // {"hotel_id": {$eq:req.params.key}},
      {"Date": {$eq:req.params.key1}},
      {"Status": {$eq:req.params.key1}},
      {"favourite": {$eq:req.params.key1}}],
      //  {"owner_id": {$eq:req.params.key}},

      "$and":[
        {"owner_id": {$eq:req.params.key}}],

  })
  res.send(data)

  });

  //get task using hotelid all data field
  app.get('/task/:key/:key1', async (req, res) => {

    let data = await Task.find({
    
      "$or": [
        // {"hotel_id": {$eq:req.params.key}},
        {"Date": {$eq:req.params.key1}},
        {"Status": {$eq:req.params.key1}},
        {"favourite": {$eq:req.params.key1}}],
        //  {"owner_id": {$eq:req.params.key}},
  
        "$and":[
          {"hotel_id": {$eq:req.params.key}}],
  
    })
    res.send(data)
  
    });
  

  //get tasks using ownerid and hotelid
  app.get('/tasks/:key', async (req, res) => {

    let data = await Task.find({
    
        "$or":[
          {"owner_id": {$eq:req.params.key}},
          {"hotel_id": {$eq:req.params.key}},
          {"Date": {$eq:req.params.key}},
          {"Status": {$eq:req.params.key}}]
  
    })
    res.send(data)
  
    });
  

 


  //get property using hotelid and ownerid
  app.get('/property/:key', async (req, res) => {
    let data = await Property.find({
        "$or": [
            
        {"hotel_id": {$eq:req.params.key}},
        {"owner_id": {$eq:req.params.key}}]
        
    })
    res.send(data)
});


//get hotel_owner using Country ownerid
app.get('/hotel_owner/:key', async (req, res) => {
  let data = await Hotel_owner.find({
      "$or": [
          
      {"Country": {$eq:req.params.key}},
      {"owner_id": {$eq:req.params.key}}]
      
  })
  res.send(data)
});



//   //update data in task property hotel_owner and social
// app.patch("/:resource/:id", async (req,res)=>{
//   if (req.params.resource === 'task'){
//     const id=req.params.id; 
//     const updatetask = await  Task.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//       if(updatetask){
//           res.send("successfully updated");
//       }
//       else{
//           res.send("something wrong");
//       }
     
//   }else if(req.params.resource === 'property'){
//       const id=req.params.id; 
//       const updateproperty = await  Property.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//       if(updateproperty){
//           res.send("successfully updated");
//       }else{
//           res.send("something wrong");
//       }
//   }else if(req.params.resource === 'Hotel_owner'){
//       const id=req.params.id; 
//       const updatehotel = await  Hotel_owner.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//       if(updatehotel){
//           res.send("successfully updated");
//       }else{
//           res.send("something wrong");
//       }
//   }else if(req.params.resource === 'social'){
//       const id=req.params.id; 
//       const updatesocial = await  Social.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//       if(updatesocial){
//           res.send("successfully updated");
//       }else{
//           res.send("something wrong");
//       }
//   }else{
//       res.send("pls enter data for update");
//   }
// })



 
  


//update api for Task, Property, hotlowner and social
app.patch("/update/:id",async(req,res)=>{
  try{
     const _id=req.params.id; 
    const updatetask = await  Task.findByIdAndUpdate(_id,req.body);
    if(updatetask){
    res.send({ message: "update successfull " })
    }
    else if(!updatetask){
      const updateproperty = await  Property.findByIdAndUpdate(_id,req.body);
       if(updateproperty){
        res.send({ message: "update successfull " })
        }
        else if(!updateproperty){
                 const updatehotel = await  Hotel_owner.findByIdAndUpdate( _id,req.body);
                  if(updatehotel){
                    res.send({ message: "update successfull " })
                  }
              else if(!updatehotel){
                   const updatesocial = await  Social.findByIdAndUpdate(_id,req.body);
                  if(updatesocial){
                    res.send({ message: "update successfull " })
                  }

      
                }
              }
            }

  }catch(e){
     res.status(404).send({message:"something wrong"});

  }
})





//
 app.listen(PORT,() =>{

    console.log(`connection is setup at ${PORT}`);
 })