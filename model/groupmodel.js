import { error } from "console";
import pool from "../config/connect";


const createGroup = async(name) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO `nhom` (ten) VALUES (?)', 
            [name] 
        );
        return result;
    } catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }
}

const getAllGroup = async() => {
    const Result = await pool.execute('SELECT * FROM `nhom`');
    return Result[0];
}

export { 
    createGroup,
    getAllGroup,
 };