﻿using System;
using System.Collections.Generic;

namespace dm_backend.Models
{
    public partial class Role
    {
        public Role()
        {
           
            UserToRole = new HashSet<UserToRole>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

       
        public ICollection<UserToRole> UserToRole { get; set; }
    }
}
