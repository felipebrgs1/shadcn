import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, Trash2, Plus } from "lucide-react";

// Interface para o modelo de dados Todo
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Carregar todos do localStorage quando o componente montar
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Salvar todos no localStorage quando houver alterações
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Adicionar novo todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  // Alternar estado de completado
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Remover todo
  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Lista de Tarefas
          </h1>
          <p className="text-muted-foreground mt-2">
            Organize suas tarefas diárias e aumente sua produtividade
          </p>
        </div>

        {/* Adicionar novo Todo */}
        <Card className="border-t-4 border-t-blue-500 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-500">Adicionar Tarefa</CardTitle>
            <CardDescription>
              Adicione uma nova tarefa à sua lista
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Digite sua tarefa..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                className="border-blue-200 focus-visible:ring-blue-400"
              />
              <Button
                onClick={addTodo}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="size-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Lista de Todos */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Suas Tarefas</h2>
            <div className="text-sm text-muted-foreground">
              {todos.filter((t) => t.completed).length}/{todos.length}{" "}
              concluídas
            </div>
          </div>

          {todos.length === 0 ? (
            <Card className="border border-dashed border-blue-200 bg-blue-50/30 dark:bg-blue-950/10">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-2 text-blue-500">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                    <CheckCircle2 className="size-8 opacity-50" />
                  </div>
                  <p className="font-medium">Nenhuma tarefa adicionada</p>
                  <p className="text-sm text-muted-foreground">
                    Comece adicionando uma nova tarefa acima
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <Card
                  key={todo.id}
                  className={`transition-all duration-300 hover:shadow-md ${
                    todo.completed
                      ? "border-l-4 border-l-green-500 bg-green-50/30 dark:bg-green-950/10"
                      : "border-l-4 border-l-blue-500"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleComplete(todo.id)}
                          className="text-blue-500 hover:text-green-500 transition-colors"
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="size-5 text-green-500" />
                          ) : (
                            <Circle className="size-5" />
                          )}
                        </button>
                        <span
                          className={`${
                            todo.completed
                              ? "line-through text-muted-foreground"
                              : "font-medium"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTodo(todo.id)}
                        className="hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
