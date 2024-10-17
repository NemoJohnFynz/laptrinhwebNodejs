
import { error } from "console";
import pool from "../config/connect";
import bcrypt from "bcrypt";

//req,res bên controller không phải bên model
const gelAllUser = async() => {
    const [rows] = await pool.execute('SELECT fullname, address, sex, email FROM users');
    return rows
}

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
    // const [row,feilds] = await pool.execute('INSERT INTO users VALUES(?,?,?,?,?,?)')

}

const inserUser = async(username, password, fullname, address, sex, email)=>{
    const [row,feilds] = await pool.execute('INSERT iNTO users(username, password, fullname, address, sex, email) VALUES(?,?,?,?,?,?)',[username,password,fullname,address,sex,email])
}

const updateUser = async(fullname,address,sex,email) => {
    const [result] = await pool.execute(
        'UPDATE users SET fullname = ?, address = ?, sex = ?, email = ?', 
        [ fullname, address, sex, email],(err,result) => {
            if (err) throw err;
        callback(result);
    });
};



export { gelAllUser, register, inserUser }