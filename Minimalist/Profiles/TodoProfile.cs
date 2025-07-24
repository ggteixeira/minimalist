using AutoMapper;
using Minimalist.Data.Dtos;
using Minimalist.Models;

namespace Minimalist.Profiles;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<CreateTodoDto, Todo>();
    }
}