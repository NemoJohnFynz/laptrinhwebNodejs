import exp from "constants";
import pool from "../config/connect";
import { error } from "console";

const createProduct = async(name, price, descriostion, image, idGroup) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO `sanpham` (ten, gia, mota, hinhanh, id_nhom) VALUES (?, ?, ?, ?, ?)', 
            [name, price, descriostion, image, idGroup] 
        );
        return result;
    } catch (error) {
        console.log('i do not what errorr: ', error);
        throw error;
    }
}

export {
    createProduct,
    

}