const express=require('express')
const app=express()
const path=require('path')
const server=require('http').Server(app)
const io=require('socket.io')(server)

app.use(express.static('public'))

const multer=require('multer')

// const cv=require('opencv4nodejs')

// const wCap=new cv.VideoCapture(0)
//
// const FPS=30;
//
// wCap.set(cv.CAP_PROP_FRAME_WIDTH,300)
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT,300)

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/video.html'))
})


const multerConf={
  storage:multer.diskStorage({
    destination:function(req,file,next){
      next(null,'./public/videos')
    },

    filename:function(req,file,next){
next(null,file.fieldname+'-'+Date.now()+'.'+file.mimetype.split('/')[1])
    }

  })
}


// app.get('/:uploadvideo',multer(multerConf).single('videoFile'),(req,res)=>{
//   console.log('done');
// })

// app.post('/upload',multer(multerConf).single('video'),(req,res)=>{
// console.log('uploaded');
// })

app.post('/upload',multer(multerConf).single('videoFile'),(req,res)=>{

res.redirect('/')

})

// setInterval(()=>{
//   const frame=wCap.read()
//
//   const image=cv.imencode('.jpg',frame).toString('base64')
//
//   io.emit('image',image)
// },1000/FPS)
//
//
// server.listen(3000)

app.listen(3000,(req,res)=>{
  console.log("server started");
})
