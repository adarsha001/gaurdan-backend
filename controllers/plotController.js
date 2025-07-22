import Plot from '../models/Plot.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new plot
export const createPlot = async (req, res) => {
  try {
    const { name, location, plot_type, price, map_url, dimensions, area, 
            ownership_type, zoning, soil_type, access_road, utilities , description} = req.body;
    
    // Upload images to Cloudinary
    const imageUploads = req.files?.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    });
    
    const images = await Promise.all(imageUploads || []);
    
    const newPlot = new Plot({
      name,
      location,
      plot_type,
      price,
      map_url,
      dimensions: JSON.parse(dimensions),
      area,
      ownership_type,
      zoning,
      soil_type,
      access_road,
      utilities: JSON.parse(utilities),
      images, description
    });

    await newPlot.save();
    res.status(201).json(newPlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all plots
export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.find().sort({ createdAt: -1 });
    res.json(plots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single plot by ID
export const getPlotById = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: 'Plot not found' });
    res.json(plot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a plot
export const updatePlot = async (req, res) => {
  try {
    const { name, location, plot_type, price, map_url, dimensions, area, 
            ownership_type, zoning, soil_type, access_road, utilities, description } = req.body;
    
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: 'Plot not found' });

    // Handle image updates if new files are uploaded
    let images = plot.images;
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      await Promise.all(plot.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      }));
      
      // Upload new images
      const imageUploads = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
          url: result.secure_url,
          public_id: result.public_id
        };
      });
      images = await Promise.all(imageUploads);
    }

    const updatedPlot = await Plot.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        plot_type,
        price,
        map_url,
        dimensions: JSON.parse(dimensions),
        area,
        ownership_type,
        zoning,
        soil_type,
        access_road,
        utilities: JSON.parse(utilities),
        images, description
      },
      { new: true }
    );

    res.json(updatedPlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a plot
export const deletePlot = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: 'Plot not found' });

    // Delete images from Cloudinary
    await Promise.all(plot.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    }));

    await Plot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};