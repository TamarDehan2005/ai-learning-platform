
public interface IOpenAIService
{
    Task<string> GetCompletionAsync(string prompt);
}