import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId

            })
            resolve('ok! create a new user succeed!')

        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }


    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => { 
    return new Promise(async (resolve, reject) => { 
        try{
     let user = await db.User.findOne({
        where: { id: userId},
        raw:true,
    })
    if(user) {
        resolve (user)
    }
    else {
        resolve ({})
    }
    
    }catch(e) { 
        reject(e);
    }
    })
    }

    let updateUserData = (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            // Tìm user dựa trên ID
            let user = await db.User.findOne({
              where: { id: data.id },
            });
      
            if (user) {
              // Cập nhật thông tin user
              user.firstName = data.firstName;
              user.lastName = data.lastName;
              user.address = data.address;
      
              // Lưu thông tin cập nhật
              await user.save();
              let allUsers = await db.User.findAll();
              resolve(allUsers); // Trả về user sau khi cập nhật thành công
            } else {
              resolve("User not found"); // Xử lý khi không tìm thấy user
            }
          } catch (e) {
            console.error("Error updating user:", e);
            reject(e); // Trả về lỗi cho promise
          }
        });
      };
      
      let deleteUserById = (userId) =>{
        return new Promise (async(resolve,reject) => {
            try {
                let user = await db.User.findOne({
                    where:{id:userId}

                })
                if(user){
                   await user.destroy();
                }
                resolve();
            }catch(e){
                reject(e);
            }
        })
      }

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}