import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileSpreadsheet,
  Upload,
  Download,
  BarChart4,
  Table2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface DataItem {
  [key: string]: string | number | boolean | null | undefined;
}

function Excel() {
  const [data, setData] = useState<DataItem[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filename, setFilename] = useState<string>("dados");
  const [importStatus, setImportStatus] = useState<{
    message: string;
    type: "success" | "error" | "info" | null;
  }>({ message: "", type: null });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Importar dados do Excel
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setFilename(file.name.split(".")[0]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const wb = XLSX.read(event.target?.result, { type: "binary" });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        if (rawData.length > 0) {
          setData(rawData as DataItem[]);
          setColumns(Object.keys(rawData[0] as object));
          setImportStatus({
            message: `Importados ${rawData.length} registros com sucesso!`,
            type: "success",
          });
        } else {
          setImportStatus({
            message: "O arquivo não contém dados.",
            type: "error",
          });
        }
      } catch (error) {
        setImportStatus({
          message: "Erro ao processar o arquivo.",
          type: "error",
        });
        console.error("Erro ao processar o arquivo:", error);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      setImportStatus({
        message: "Erro ao ler o arquivo.",
        type: "error",
      });
    };

    reader.readAsBinaryString(file);
  };

  // Exportar dados para Excel
  const handleExport = () => {
    if (data.length === 0) {
      setImportStatus({
        message: "Não há dados para exportar.",
        type: "info",
      });
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
    XLSX.writeFile(wb, `${filename}.xlsx`);

    setImportStatus({
      message: "Dados exportados com sucesso!",
      type: "success",
    });
  };

  // Renderizar um gráfico de barras simples com Chart.js
  const renderChart = () => {
    if (data.length === 0 || columns.length < 2) return null;

    const labelCol = columns[0];
    const dataCol = columns[1];
    const chartData = data.slice(0, 10);

    const labels = chartData.map((item) => String(item[labelCol]));
    const values = chartData.map((item) =>
      typeof item[dataCol] === "number" ? item[dataCol] : 0,
    );

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `Visualização dos dados (${dataCol} por ${labelCol})`,
        },
      },
    };

    const chartDataConfig = {
      labels,
      datasets: [
        {
          label: dataCol,
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    return <Bar options={chartOptions} data={chartDataConfig} />;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Importação/Exportação Excel
        </h1>
        <p className="text-muted-foreground mt-2">
          Importe dados de planilhas, visualize e exporte novamente
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Card de Importação */}
        <Card className="border-t-4 border-t-indigo-500 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Importar dados
            </CardTitle>
            <CardDescription>
              Importe dados de uma planilha Excel (.xlsx)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImport}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card de Exportação */}
        <Card className="border-t-4 border-t-purple-500 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Exportar dados
            </CardTitle>
            <CardDescription>
              Exporte os dados atuais para uma planilha Excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Nome do arquivo"
                className="flex-1"
              />
              <Button
                onClick={handleExport}
                disabled={data.length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status de importação/exportação */}
      {importStatus.type && (
        <Alert
          className={`mb-8 ${
            importStatus.type === "success"
              ? "bg-green-50 dark:bg-green-950/20 border-green-500"
              : importStatus.type === "error"
              ? "bg-red-50 dark:bg-red-950/20 border-red-500"
              : "bg-blue-50 dark:bg-blue-950/20 border-blue-500"
          }`}
        >
          <AlertTitle
            className={`${
              importStatus.type === "success"
                ? "text-green-600 dark:text-green-400"
                : importStatus.type === "error"
                ? "text-red-600 dark:text-red-400"
                : "text-blue-600 dark:text-blue-400"
            }`}
          >
            {importStatus.type === "success"
              ? "Sucesso"
              : importStatus.type === "error"
              ? "Erro"
              : "Informação"}
          </AlertTitle>
          <AlertDescription>{importStatus.message}</AlertDescription>
        </Alert>
      )}

      {/* Visualização dos dados */}
      {data.length > 0 && (
        <>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="table" className="flex items-center gap-2">
                <Table2 className="h-4 w-4" />
                Tabela
              </TabsTrigger>
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                Gráfico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Importados</CardTitle>
                  <CardDescription>
                    {data.length} registros encontrados
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {columns.map((column) => (
                            <TableHead key={column}>{column}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {columns.map((column) => (
                              <TableCell key={`${rowIndex}-${column}`}>
                                {row[column]?.toString() || ""}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart">
              <Card>
                <CardHeader>
                  <CardTitle>Visualização Gráfica</CardTitle>
                  <CardDescription>
                    Representação visual dos primeiros 10 registros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderChart()}
                  <p className="text-xs text-muted-foreground mt-4">
                    Nota: Este é um gráfico simples para fins de demonstração.
                    Em um aplicativo real, você usaria uma biblioteca como
                    Chart.js ou Recharts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default Excel;
