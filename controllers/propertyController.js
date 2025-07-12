import Property from '../model/Property.js';

// Create new property
// Create new property with images
export const createProperty = async (req, res) => {
  try {
    const { files } = req;
    const imageData = files.map(file => ({
      url: file.path,
      public_id: file.filename,
    }));

    const property = new Property({
      ...req.body,
      images: imageData,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
