import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    title: "Excel",
    description: "Ferramenta para importação e exportação de dados em Excel.",
    icon: PieChart,
    link: "/excel",
  },
  {
    title: "To Do",
    description: "Gerenciador de tarefas.",
    icon: Map,
    link: "/todo",
  },
];

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Ferramentas
        </h1>
        <p className="text-muted-foreground mt-2">
          Lista de todas as ferramentas disponíveis
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="border-t-4 border-t-indigo-500 shadow-md cursor-pointer"
            onClick={() => navigate(tool.link)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <tool.icon className="h-5 w-5" />
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tools;
