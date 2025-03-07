namespace TodoList.Api.Models;

public class TodoListModel
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public string Details { get; set; } = string.Empty;
}
