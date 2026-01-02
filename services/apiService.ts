import { ReqresUser, ReqresListResponse } from '../types';

const BASE_URL = 'https://reqres.in/api';

export const apiService = {
  async login(payload: any) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Akses ditolak (403). Server memblokir permintaan. Pastikan tidak ada ekstensi browser (seperti AdBlock) yang memblokir reqres.in.');
        }
        throw new Error(data.error || 'Login gagal. Silakan periksa kredensial Anda.');
      }
      return data;
    } catch (error: any) {
      console.error('Login Error:', error);
      if (error instanceof TypeError || error.message.includes('fetch')) {
        throw new Error('Gagal menghubungi server. Periksa koneksi internet atau coba nonaktifkan AdBlocker/VPN.');
      }
      throw error;
    }
  },

  async register(payload: any) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal.');
      }
      return data;
    } catch (error: any) {
      if (error instanceof TypeError || error.message.includes('fetch')) {
        throw new Error('Kesalahan Jaringan: Tidak dapat menghubungi server registrasi.');
      }
      throw error;
    }
  },

  async getUsers(page: number = 1): Promise<ReqresListResponse> {
    try {
      const response = await fetch(`${BASE_URL}/users?page=${page}`);
      if (!response.ok) throw new Error('Gagal mengambil data staff.');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Gagal memuat direktori staff. Periksa koneksi Anda.');
    }
  },

  async getUser(id: number): Promise<{ data: ReqresUser }> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      if (!response.ok) throw new Error('Staff tidak ditemukan.');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Gagal memuat detail staff.');
    }
  }
};