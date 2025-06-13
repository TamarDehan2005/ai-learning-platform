using GenLearn.BL.Api;
using GenLearn.BL.Mapping;
using GenLearn.BL.Services;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using GenLearn.DAL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;



// App builder
var builder = WebApplication.CreateBuilder(args);

//  AutoMapper registration
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

//  DB registration
builder.Services.AddScoped<DB_Manager>();

//  DAL Layer
builder.Services.AddScoped<ICategoryService_DAL, CategoryService_DAL>();
builder.Services.AddScoped<ISubCategoryService_DAL, SubCategoryService_DAL>();
builder.Services.AddScoped<IUserService_DAL, UserService_DAL>();
builder.Services.AddScoped<IPromptService_DAL, PromptService_DAL>();

//  BL Layer
builder.Services.AddScoped<ICategoryService_BL, CategoryService_BL>();
builder.Services.AddScoped<ISubCategoryService_BL, SubCategoryService_BL>();
builder.Services.AddScoped<IUserService_BL, UserService_BL>();
builder.Services.AddScoped<IPromptService_BL, PromptService_BL>();

// OpenAI Service registration
builder.Services.AddHttpClient<IOpenAIService, OpenAIService>();

// Controllers + Swagger registration
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GenLearn API", Version = "v1" });
});




// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});



// App builder
var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();
app.Run();
