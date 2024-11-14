import * as groupmodel from '../model/groupmodel.js';

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
       const result = await groupmodel.createGroup(name);
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllGroup = async(req, res) => {
    try {
        const result = await groupmodel.getAllGroup();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export { 
    createGroup,
    getAllGroup,
    
 };