import { use, useState } from "react";
import Alert, { type AlertColor } from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const CalculadoraPropina = () => {
  const [amount, setAmount] = useState("");
  const [tipPercent, setTipPercent] = useState<number | null>(null);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
  type AlertColor = "success" | "info" | "warning" | "error";
  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string;
    visible: boolean;
  }>({ type: "info", message: "", visible: false });
  const showAlert = (type: AlertColor, message: string) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showAlert("error", "Por favor, ingresa un monto valido...");
      return;
    }
    if (!tipPercent) {
      showAlert("warning", "Selecciona un porcentaje de propina.");
      return;
    }

    const calculatedTip = parsedAmount * (tipPercent / 100);
    const calculatedTotal = parsedAmount + calculatedTip;
    setTip(calculatedTip);
    setTotal(calculatedTotal);
    showAlert("success", "Propina calculada correctamente");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Collapse in={alert.visible}>
        <Alert severity={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      </Collapse>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Calculadora de Propinas
      </h2>

      <label className="block mb-2 font-medium">Monto de la cuenta:</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ej. 250.00"
      />
      <label className="block mb-2 font-medium">
        Selecciona el porcentaje de propina:
      </label>
      <div className="flex gap-4 mb-4">
        {[10, 15, 20].map((percent) => (
          <button
            key={percent}
            onClick={() => setTipPercent(percent)}
            className={`px-4 py-2 rounded ${
              tipPercent === percent
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {percent}%
          </button>
        ))}
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Calcular Propina
      </button>

      {tip > 0 && (
        <div className="mt-6 text-center">
          <p className="text-lg">
            Propina: <strong>L. {tip.toFixed(2)}</strong>
          </p>
          <p className="text-lg">
            Total a pagar: <strong>L. {total.toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPropina;