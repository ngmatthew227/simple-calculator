import Paper from "@mui/material/Paper";
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, GridColDef, MuiEvent } from "@mui/x-data-grid";
import { useIncomeStore } from "./store/IncomeStore";

const columns: GridColDef[] = [
  { field: "date", sortable: false, filterable: false, headerName: "日期", maxWidth: 10, editable: false, valueFormatter: (params) => params.value.toString().slice(8, 10) },
  { field: "octopusIncome", sortable: false, filterable: false, headerName: "八達通", maxWidth: 100, editable: true, type: "number" },
  { field: "alipayIncome", sortable: false, filterable: false, headerName: "支付寶", maxWidth: 100, editable: true, type: "number" },
  { field: "wechatIncome", sortable: false, filterable: false, headerName: "微信", maxWidth: 100, editable: true, type: "number" },
  { field: "totalIncome", sortable: false, filterable: false, headerName: "總收入", maxWidth: 150, editable: false, type: "number" },
];

interface IncomeTableProps {
  year: string;
  month: string;
}

export default function IncomeTable({ year, month }: IncomeTableProps) {
  const { incomes, updateIncome, deleteIncome } = useIncomeStore();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div style={{ width: "100%" }}>
        <DataGrid
          disableColumnMenu
          editMode="row"
          rows={incomes
            .filter((income) => income.date.startsWith(`${year}-${month}`))
            .map((income) => ({
              ...income,
              id: income.date,
            }))}
          columns={columns}
          processRowUpdate={(updatedRow, originalRow) => {
            console.log(updatedRow);
            const updatedIncome = updatedRow as any;
            updatedIncome.totalIncome = updatedIncome.octopusIncome + updatedIncome.alipayIncome + updatedIncome.wechatIncome;
            updateIncome(updatedIncome);
            return updatedRow;
          }}
          onProcessRowUpdateError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>
    </Paper>
  );
}
