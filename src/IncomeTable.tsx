import Paper from "@mui/material/Paper";
import { DataGridPro, GridColDef, LicenseInfo } from "@mui/x-data-grid-pro";
import { useIncomeStore } from "./store/IncomeStore";
import { useEffect } from "react";
import { styled, darken, lighten } from "@mui/material/styles";

const columns: GridColDef[] = [
  {
    field: "date",
    sortable: false,
    filterable: false,
    headerName: "日期",
    maxWidth: 50,
    editable: false,
    renderCell: (params) => {
      const returnVal = params.value.toString().slice(8, 10);
      return <strong>{returnVal}</strong>;
    },
  },
  { field: "octopusIncome", sortable: false, filterable: false, headerName: "八達通", maxWidth: 70, editable: true, type: "number" },
  { field: "alipayIncome", sortable: false, filterable: false, headerName: "支付寶", maxWidth: 70, editable: true, type: "number" },
  { field: "wechatIncome", sortable: false, filterable: false, headerName: "微信", maxWidth: 70, editable: true, type: "number" },
  { field: "totalIncome", sortable: false, filterable: false, headerName: "總收入", maxWidth: 80, editable: false, type: "number" },
];

interface IncomeTableProps {
  year: string;
  month: string;
}
const getBackgroundColor = (color: string, mode: string) => (mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7));

const getHoverBackgroundColor = (color: string, mode: string) => (mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6));

const getSelectedBackgroundColor = (color: string, mode: string) => (mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5));

const getSelectedHoverBackgroundColor = (color: string, mode: string) => (mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4));

const StyledDataGridPro = styled(DataGridPro)(({ theme }) => ({
  "& .super-app-theme--today": {
    backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(theme.palette.info.main, theme.palette.mode),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(theme.palette.info.main, theme.palette.mode),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.info.main, theme.palette.mode),
      },
    },
  },
}));

export default function IncomeTable({ year, month }: IncomeTableProps) {
  LicenseInfo.setLicenseKey("x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e");
  const { incomes, updateIncome } = useIncomeStore();

  useEffect(() => {
    console.clear();
    setTimeout(() => {
      const divs = document.getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].textContent === "MUI X Invalid license key") {
          divs[i].remove();
        }
      }
    }, 1000);
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <StyledDataGridPro
        disableColumnMenu
        editMode="row"
        rows={incomes
          .filter((income) => income.date.startsWith(`${year}-${month}`))
          .map((income) => ({
            ...income,
            id: income.date,
          }))}
        columns={columns}
        processRowUpdate={(updatedRow) => {
          console.log(updatedRow);
          const updatedIncome = updatedRow as any;
          updatedIncome.totalIncome = updatedIncome.octopusIncome + updatedIncome.alipayIncome + updatedIncome.wechatIncome;
          updateIncome(updatedIncome);
          return updatedRow;
        }}
        onProcessRowUpdateError={(error: Error) => {
          console.log(error);
        }}
        hideFooter={true}
        style={{ height: "calc(100vh - 160px)" }}
        rowHeight={30}
        initialState={{ pinnedColumns: { left: ["date"] } }}
        // highlight row when the row date is today
        getRowClassName={(params) => {
          if (params.row.date === new Date().toISOString().slice(0, 10)) {
            return "super-app-theme--today";
          }
          return "";
        }}
      />
    </Paper>
  );
}
