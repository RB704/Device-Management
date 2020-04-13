﻿using DeviceManagementPro.Models;
using System.Threading.Tasks;

namespace dm_backend.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string name, string password);

        Task<bool> UserExists(string name);
    }
}
