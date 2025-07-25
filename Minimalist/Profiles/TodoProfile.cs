using AutoMapper;
using Minimalist.Data.Dtos;
using Minimalist.Models;

namespace Minimalist.Profiles;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        /*
        CreateMap<CreateTodoDto, Todo>();
        CreateMap<ReadTodoDto, Todo>();
        */
        
        CreateMap<CreateTodoDto, Todo>();
        CreateMap<UpdateTodoDto, Todo>();
        CreateMap<Todo, UpdateTodoDto>();
        CreateMap<Todo, ReadTodoDto>();

    }
}