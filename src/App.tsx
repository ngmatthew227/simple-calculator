import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import domtoimage from "dom-to-image";
import { useState } from "react";
import "./App.css";
import { MONTHS, YEARS } from "./Constants";
import IncomeTable from "./IncomeTable";
import { useIncomeStore } from "./store/IncomeStore";

const Header = styled("header")`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
  color: white;
`;

function App() {
  // init with current month
  const [year, setYear] = useState<string>(new Date().toLocaleDateString("en", { year: "numeric" }));
  const [month, setMonth] = useState<string>(new Date().toLocaleDateString("en", { month: "2-digit" }));
  const { incomes, initForMonth } = useIncomeStore();

  const exportToPng = () => {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      metaViewport?.setAttribute("content", "width=600, initial-scale=1");
    }
    const wholePage = document.querySelector(".MuiContainer-root") as HTMLElement;
    domtoimage
      .toPng(wholePage, {
        width: 600,
        height: 1800,
        bgcolor: "white",
      })
      .then(async function (dataUrl) {
        try {
          if (navigator.share) {
            const blob = await (await fetch(dataUrl)).blob();
            const fileName = `電子收入表_${year}_${month}.png`;
            const file = new File([blob], fileName, { type: blob.type });
            await navigator.share({
              title: "電子收入表",
              text: `電子收入表_${year}_${month}`,
              files: [file],
            });
          }
        } catch (err) {
          console.error("Error: " + err);
        }
      })
      .then(() => {
        if (isMobile) {
          const metaViewport = document.querySelector('meta[name="viewport"]');
          metaViewport?.setAttribute("content", "width=device-width, initial-scale=1");
        }
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    // change back to original viewport
  };

  return (
    <Container>
      <Header>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">年份</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={year}
            label="年份"
            onChange={(event) => {
              setYear(event.target.value as string);
              const selectedMonthIncome = incomes.filter((income) => income.date.startsWith(`${event.target.value}-${month}`));
              console.log(selectedMonthIncome);
              if (selectedMonthIncome.length === 0) {
                console.log(`initForMonth ${event.target.value}`);
                initForMonth(event.target.value as string, month);
              }
            }}
          >
            {YEARS.map((innerYear, idx) => (
              <MenuItem key={idx} value={innerYear.value}>
                {innerYear.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">月份</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={month}
            label="月份"
            onChange={(event) => {
              setMonth(event.target.value as string);
              const selectedMonthIncome = incomes.filter((income) => income.date.startsWith(`${year}-${event.target.value}`));
              if (selectedMonthIncome.length === 0) {
                initForMonth(year, event.target.value as string);
              }
            }}
          >
            {MONTHS.map((innerMonth, idx) => (
              <MenuItem key={idx} value={innerMonth.value}>
                {innerMonth.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Header>
      <div style={{ flex: 1 }}>
        <IncomeTable year={year} month={month} />
      </div>
      <div style={{ display: "flex" }}>
        <Paper style={{ marginTop: "10px", height: "50px", textAlign: "left", display: "flex", alignItems: "center", paddingInline: "10px", flex: "1" }} elevation={3}>
          <Typography style={{ fontWeight: "bold" }}>總計:</Typography>
          <Typography style={{ fontWeight: "bold", flex: "1", textAlign: "right" }}>
            {incomes
              .filter((income) => income.date.startsWith(`${year}-${month}`))
              .reduce((acc, cur) => acc + (cur?.totalIncome ?? 0), 0)
              ?.toLocaleString()}
          </Typography>
        </Paper>
        <Button variant="contained" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={exportToPng}>
          分享
        </Button>
      </div>
    </Container>
  );
}

export default App;
