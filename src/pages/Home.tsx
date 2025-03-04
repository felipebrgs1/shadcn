import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Bem-vindo ao Projeto React + Shadcn/UI
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Uma demonstração moderna de interface usando React com a biblioteca de
          componentes Shadcn/UI.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sobre o Projeto</CardTitle>
          <CardDescription>
            Conheça mais sobre este projeto e suas funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Este é um projeto demonstrativo que utiliza React com Typescript,
              estilizado com Tailwind CSS e complementado pelos componentes do
              Shadcn/UI para criar uma interface moderna e responsiva.
            </p>
            <p>
              O projeto inclui várias funcionalidades de exemplo, como um
              gerenciador de tarefas (TO DO), temas claro e escuro, e uma
              estrutura de navegação intuitiva.
            </p>
            <p>
              Sinta-se à vontade para explorar todas as páginas e componentes
              disponíveis através da barra lateral de navegação.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Saiba mais</Button>
        </CardFooter>
      </Card>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recursos Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Design responsivo com Tailwind CSS</li>
              <li>Componentes reutilizáveis com Shadcn/UI</li>
              <li>Gerenciamento de estado com React Hooks</li>
              <li>Navegação intuitiva</li>
              <li>Temas claro e escuro</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tecnologias Utilizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>React + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Shadcn/UI</li>
              <li>Vite</li>
              <li>React Router</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
