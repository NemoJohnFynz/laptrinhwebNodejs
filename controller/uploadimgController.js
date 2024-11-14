import { error } from "console";



const uploadImage = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
  
    // Respond with the image path
    res.json({
      message: 'Image uploaded successfully',
      path: imagePaths  // Path to save in the database
    });
  };

  export{
        uploadImage
  }