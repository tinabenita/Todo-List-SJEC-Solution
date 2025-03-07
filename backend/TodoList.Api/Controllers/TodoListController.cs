using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoListController : ControllerBase
{
    private readonly TodoListDbContext _context;

    public TodoListController(TodoListDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoListModel>>> GetTodoItems()
    {
        return await _context.TodoListItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoListModel>> GetTodoItem(int id)
    {
        var todoItem = await _context.TodoListItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }
        return todoItem;
    }

    [HttpPost]
    public async Task<ActionResult<TodoListModel>> PostTodoItem(TodoListModel todoItem)
    {
        todoItem.Id = Guid.NewGuid();
        _context.TodoListItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }

    private bool TodoItemExists(Guid id)
    {
        return _context.TodoListItems.Any(e => e.Id == id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodoItem(Guid id, TodoListModel todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }
        _context.Entry(todoItem).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(Guid id)
    {
        var todoItem = await _context.TodoListItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }
        _context.TodoListItems.Remove(todoItem);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
