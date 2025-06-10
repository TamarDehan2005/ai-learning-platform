using GenLearn.BL.Api;
using GenLearn.BL.Mapping;
using GenLearn.BL.Services;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using GenLearn.DAL.Services;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;



//// בונה אפליקציה
var builder = WebApplication.CreateBuilder(args);

//// הרשמת AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

//// הרשמת DB
builder.Services.AddScoped<DB_Manager>();

//// שכבת DAL
builder.Services.AddScoped<ICategoryService_DAL, CategoryService_DAL>();
builder.Services.AddScoped<ISubCategoryService_DAL, SubCategoryService_DAL>();
builder.Services.AddScoped<IUserService_DAL, UserService_DAL>();
builder.Services.AddScoped<IPromptService_DAL, PromptService_DAL>();

// שכבת BL
builder.Services.AddScoped<ICategoryService_BL, CategoryService_BL>();
builder.Services.AddScoped<ISubCategoryService_BL, SubCategoryService_BL>();
builder.Services.AddScoped<IUserService_BL, UserService_BL>();
builder.Services.AddScoped<IPromptService_BL, PromptService_BL>();

// הרשמת OpenAI Service – ודא שיש לך מימוש מתאים
builder.Services.AddHttpClient<IOpenAIService, OpenAIService>();

// Controllers + Swagger
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



// בניית האפליקציה
var app = builder.Build();

// משרת קבצים סטטיים (React)
app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "frontend"))
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "frontend"))
});

// כל בקשה שלא ל-API תלך ל-index.html
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "frontend"))
});

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
