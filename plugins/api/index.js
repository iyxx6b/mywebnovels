import axios from 'axios'

// ใช้ process.env.API_URL เพื่อดึงค่าจากไฟล์ .env
const API = axios.create({
  baseURL: process.env.API_URL
})

export const getNovels = () => API.get('/novels')
export const getNovelById = (id) => API.get(`/novels/${id}`)