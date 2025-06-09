using System;
using System.Collections.Generic;

namespace GenLearn.DAL.Models;

public partial class User
{
    public int Id { get; set; }
    
    public string Name { get; set; } = null!;

    public string? Phone { get; set; }

    public virtual ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
}
