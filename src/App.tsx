import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { MONTHS, YEARS } from "./Constants";
import IncomeTable from "./IncomeTable";
import { useIncomeStore } from "./store/IncomeStore";
import domtoimage from "dom-to-image";

const Header = styled("header")`
  min-height: 80px;
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
      metaViewport?.setAttribute("content", "width=600");
    }
    const wholePage = document.querySelector(".MuiContainer-root") as HTMLElement;
    domtoimage
      .toPng(wholePage)
      .then(async function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        try {
          if (navigator.share) {
            await navigator.share({
              title: "收入表",
              text: "收入表",
              url: dataUrl,
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
      <IncomeTable year={year} month={month} />
      <div style={{ display: "flex" }}>
        <Paper style={{ marginTop: "10px", height: "50px", textAlign: "left", display: "flex", alignItems: "center", paddingInline: "10px", flex: "1" }} elevation={3}>
          <Typography style={{ fontWeight: "bold" }}>總計:</Typography>
          <Typography style={{ fontWeight: "bold", flex: "1", textAlign: "right" }}>
            {incomes
              .filter((income) => income.date.startsWith(`${year}-${month}`))
              .reduce((acc, cur) => acc + cur.totalIncome, 0)
              .toLocaleString()}
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
