// Load Express Server
var express = require('express');
var app = express();
var multer  = require('multer');
var fs = require('fs');
var bodyParser = require('body-parser');
var gm = require('gm');
var imageMagick = gm.subClass({imageMagick: true});
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var DBUser = require('./src/api/model/User.js');

// MongoDB Connection
var mongoose = require('mongoose');
var mongoOptions = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

mongoose.connect(process.env.DATABASE, mongoOptions);

// Setup passport
passport.use(new LocalStrategy(DBUser.authenticate()));
passport.serializeUser(DBUser.serializeUser());
passport.deserializeUser(DBUser.deserializeUser());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie Parser
app.use(cookieParser());

// Session
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Prerender.io implementation for ability to have site crawled
app.use(require('prerender-node'));

// Load API Router
var apiRouter = require('./src/api/apiRouter.js');


// Frontend
app.use(express.static('src/frontend'));

// Backend
app.use('/admin', express.static('src/backend'));

// API
app.use('/api', apiRouter);

// Bower components
app.use('/bower-components', express.static('bower_components'));

// Assets
app.use('/assets', express.static('file-storage'));

// File-Upload
var fileUploadStatus = {
    status: "",
    message: "",
    filePath: ""
};

var multerConfig = {
    dest: './file-storage-temp',
    rename: function(fieldname, filename) {
        return filename + "_" + Date.now();
    },
    onFileUploadStart: function (file) {
        // console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'txt'];

        if (allowedExtension.indexOf(file.extension.toLowerCase()) != -1) {
            // Move the file to the file-storage
            fs.renameSync(__dirname + '/file-storage-temp/' + file.name, __dirname + '/file-storage/' + file.name);
            fileUploadStatus.status = "ok";
            fileUploadStatus.message = "File successfully uploaded";
            fileUploadStatus.filePath = file.name;
        } else {
            // Delete the file from the file-storage-temp
            fileUploadStatus.status = "error";
            fileUploadStatus.message = "Extension not allowed";
            fs.unlink(__dirname + '/file-storage-temp/' + file.name);
        }
    }
};
app.use('/file-upload', multer(multerConfig));

var apiUtilities = require("./src/api/utilities.js");

app.post('/file-upload', apiUtilities.isAdmin, function(req, res){
    //console.log(req.files);
    if (fileUploadStatus.status == "ok") {
        res.status(200).json({
            status: fileUploadStatus.status,
            message: fileUploadStatus.message,
            fileName: fileUploadStatus.filePath
        });
    } else {
        res.status(400).json({
            status: fileUploadStatus.status,
            message: fileUploadStatus.message
        });
    }
});

// Image Resize
app.get('/assets/resize/:width/:height/:filename', function(req, res) {
  var resize_folder = __dirname + '/file-storage/resized_images/' + req.params.width + '_' + req.params.height + '/';

  if (!fs.existsSync(__dirname + '/file-storage/resized_images/')) {
    fs.mkdirSync(__dirname + '/file-storage/resized_images/');
  }
  // Check if image has already been resized
  if (fs.existsSync(resize_folder + req.params.filename)) {
    // Send the existing file to the user
    res.sendFile(resize_folder + req.params.filename);
  }

  // Create directory for the resized image if not exists
  if (!fs.existsSync(resize_folder))
    fs.mkdirSync(resize_folder);

  // Resize the image and save it.
  imageMagick(__dirname + '/file-storage/' + req.params.filename)
      .resize(req.params.width, req.params.height, "!")
      .write(resize_folder + req.params.filename, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }

        // send the generated file to the user
        res.sendFile(resize_folder + req.params.filename);
      });
});

// Image Scale
app.get('/assets/scale/:width/:height/:filename', function(req, res) {
    var resize_folder = __dirname + '/file-storage/scaled_images/' + req.params.width + '_' + req.params.height + '/';

  if (!fs.existsSync(__dirname + '/file-storage/scaled_images/')) {
    fs.mkdirSync(__dirname + '/file-storage/scaled_images/');
  }
  // Check if image has already been resized
  if (fs.existsSync(resize_folder + req.params.filename)) {
    // Send the existing file to the user
    res.sendFile(resize_folder + req.params.filename);
  }

  // Create directory for the resized image if not exists
  if (!fs.existsSync(resize_folder))
    fs.mkdirSync(resize_folder);

  // Resize the image and save it.
  imageMagick(__dirname + '/file-storage/' + req.params.filename)
      .scale(req.params.width, req.params.height)
      .write(resize_folder + req.params.filename, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }

        // send the generated file to the user
        res.sendFile(resize_folder + req.params.filename);
      });
});


// Image Scale and crop
app.get('/assets/scale-crop/:width/:height/:filename', function(req, res) {
  var resize_folder = __dirname + '/file-storage/scaled_cropped_images/' + req.params.width + '_' + req.params.height + '/';

  if (!fs.existsSync(__dirname + '/file-storage/scaled_cropped_images/')) {
    fs.mkdirSync(__dirname + '/file-storage/scaled_cropped_images/');
  }
  // Check if image has already been resized
  if (fs.existsSync(resize_folder + req.params.filename)) {
    // Send the existing file to the user
    res.sendFile(resize_folder + req.params.filename);
  }

  // Create directory for the resized image if not exists
  if (!fs.existsSync(resize_folder))
    fs.mkdirSync(resize_folder);

  // Resize the image and save it.
  imageMagick(__dirname + '/file-storage/' + req.params.filename)
    .resize(req.params.width, req.params.height, '^')
    .gravity('Center')
    .crop(req.params.width, req.params.height)
    .write(resize_folder + req.params.filename, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      // send the generated file to the user
      res.sendFile(resize_folder + req.params.filename);
    });
});

// Start Server
var server = app.listen(process.env.PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Bahuma Shop listening at http://%s:%s', host, port);

});
