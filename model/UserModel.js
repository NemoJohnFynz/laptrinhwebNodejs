
import { error } from "console";
import pool from "../config/connect";
import bcrypt from "bcrypt";

//req,res bên controller không phải bên model
const gelAllUser = async () => {
    const [rows] = await pool.execute('SELECT id, fullname, address, sex, email FROM users');
    return rows;
};


const register = async(username, password, fullname, address, sex, email)=>{
    try {
        const [userExit] = await pool.execute(
            'SELECT * FROM `users` WHERE username = ?',[username])
        const hashPassword = await bcrypt.hash(password,10)
        //cái này là tạo trước biến hashpass lấy pass trong ejs đẩy dô thì băm luông
        const [result] = await pool.execute(
            'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, hashPassword, fullname, address, sex, email] 
        );
        return result;
    } catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }

}

const inserUser = async(username, password, fullname, address, sex, email)=>{
    const [row,feilds] = await pool.execute('INSERT iNTO users(username, password, fullname, address, sex, email) VALUES(?,?,?,?,?,?)',[username,password,fullname,address,sex,email])
}

const updateUser = async (id, fullname, address, sex, email) => {
    try {
        const [result] = await pool.execute(
            'UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?', 
            [fullname, address, sex, email, id] // Thêm id vào mảng tham số
        );
        return result; // Trả về kết quả
    } catch (err) {
        throw err; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

const deleteUser = async(id) => {
    try {
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.log('Lỗi khi xoá người dùng: ', error);
        throw error;
    }
};

const detailUser = async(id) => {
    try {
        const [rows] = await pool.execute('SELECT fullname, address, sex, email FROM users WHERE id = ?', [id]);
        return rows[0]; // trả về thông tin của một người dùng
    } catch (error) {
        console.log('Lỗi khi lấy thông tin người dùng: ', error);
        throw error;
    }
};

const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const getUserByUsername = async (username) => {
    const [rows] = await pool.execute('SELECT * From users WHERE username = ?',[username]);
    return rows[0];
};

 const login = async(username, password) => {
    const [rows] = await pool.execute('SELECT * From users WHERE username = ?',[username]);
    return rows[0];
 }


export { 
    gelAllUser, 
    register, 
    inserUser , 
    updateUser, 
    deleteUser, 
    detailUser, 
    getUserById, 
    login, 
    getUserByUsername,
 }