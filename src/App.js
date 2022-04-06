import {
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr;
  grid-template-rows: 450px;
  gap: 20px;
`;
const ListContainer = styled.div`
  border-radius: 4px;
  background-color: #eeeeee;
  overflow-y: scroll;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => {
  const [csvColumns, setCsvColumns] = useState([
    {
      key: "condition_occurrence_id",
      label: "condition_occurrence_id",
      view: true,
      always: true
    },
    { key: "person_id", label: "person_id", view: true, always: true },
    {
      key: "condition_concept_id",
      label: "condition_concept_id",
      view: true,
      always: false
    },
    {
      key: "condition_start_date",
      label: "condition_start_date",
      view: true,
      always: false
    },
    {
      key: "condition_start_datetime",
      label: "condition_start_datetime",
      view: true,
      always: true
    },
    {
      key: "condition_end_date",
      label: "condition_end_date",
      view: true,
      always: false
    },
    {
      key: "condition_end_datetime",
      label: "condition_end_datetime",
      view: false,
      always: false
    },
    {
      key: "condition_type_concept_id",
      label: "condition_type_concept_id",
      view: false,
      always: false
    },
    { key: "stop_reason", label: "stop_reason", view: false, always: false },
    { key: "provider_id", label: "provider_id", view: false, always: false },
    {
      key: "visit_occurrence_id",
      label: "visit_occurrence_id",
      view: false,
      always: false
    },
    {
      key: "visit_detail_id",
      label: "visit_detail_id",
      view: false,
      always: false
    },
    {
      key: "condition_source_value",
      label: "condition_source_value",
      view: false,
      always: false
    },
    {
      key: "condition_source_concept_id",
      label: "condition_source_concept_id",
      view: false,
      always: false
    },
    {
      key: "condition_status_source_value",
      label: "condition_status_source_value",
      view: false,
      always: false
    },
    {
      key: "condition_status_concept_id",
      label: "condition_status_concept_id",
      view: false,
      always: false
    },
    {
      key: "care_site_source_value",
      label: "care_site_source_value",
      view: false,
      always: false
    },
    { key: "etldt", label: "etldt", view: false, always: false }
  ]);

  const [datas, setDatas] = useState([
    {
      condition_occurrence_id: "zzzz",
      condition_name: "zza",
      person_id: "zzb",
      condition_start_datetime: "zzc",
      condition_status: "zzd",
      visit_occurrence_id: "zze"
    },
    {
      condition_occurrence_id: "tttt",
      condition_name: "tta",
      person_id: "ttb",
      condition_start_datetime: "ttc",
      condition_status: "ttd",
      visit_occurrence_id: "tte"
    },
    {
      condition_occurrence_id: "eeee",
      condition_name: "eea",
      person_id: "eeb",
      condition_start_datetime: "eec",
      condition_status: "eed",
      visit_occurrence_id: "eee"
    },
    {
      condition_occurrence_id: "wwww",
      condition_name: "wwa",
      person_id: "wwb",
      condition_start_datetime: "wwc",
      condition_status: "wwd",
      visit_occurrence_id: "wwe"
    },
    {
      condition_occurrence_id: "qqqq",
      condition_name: "qqa",
      person_id: "qqb",
      condition_start_datetime: "qqc",
      condition_status: "qqd",
      visit_occurrence_id: "qqe"
    }
  ]);
  const [dialogOpen, setDialogOpen] = useState(true);

  const onDialogToggle = () => {
    setDialogOpen((prev) => !prev);
  };
  const onAllViewFalse = () => {
    setCsvColumns(csvColumns.map((column) => column.always === false ? { ...column, view: false } : column));
  };
  const onAllViewTrue = () => {
    setCsvColumns(csvColumns.map((column) => column.view === false ? { ...column, view: true } : column));
  };

  const [falseListCheck, setfalseListCheck] = useState([]);
  const [trueListCheck, setTrueListCheck] = useState([]);

  const onFalseListCheck = (e) => {
    var key = e.currentTarget.dataset.value;
    if (falseListCheck.find(list=>list === key) === undefined ) {
      setfalseListCheck([...falseListCheck, key]);
    } else {
      setfalseListCheck(falseListCheck.filter(list=>list !== key))
    }
  };
  const onTrueListCheck = (e) => {
    var key = e.currentTarget.dataset.value;
    if (trueListCheck.find(list=>list === key) === undefined ) {
      setTrueListCheck([...trueListCheck, key]);
    } else {
      setTrueListCheck(trueListCheck.filter(list=>list !== key))
    }
  };

  const onViewTrue = () => {
    setCsvColumns(csvColumns.map(column=> falseListCheck.find(list=>list===column.key) !== undefined ? {...column, view: true} : column))
  };
  const onViewFalse = () => {
    setCsvColumns(csvColumns.map(column=> trueListCheck.find(list=>list===column.key) !== undefined ? {...column, view: false} : column))
  };

  return (
    <div>
      <h1>Table Column Test</h1>
      <div style={{ marginBottom: "20px" }}>
        <Button variant="outlined" onClick={onDialogToggle}>
          Column Choose
        </Button>
      </div>
      {dialogOpen && (
        <Dialog open={dialogOpen} maxWidth="lg" onClose={onDialogToggle}>
          <div style={{width: "1050px", height: "550px", padding: "0 20px 20px 20px"}}>
            <h3>Choose Table Columns</h3>
            <ColumnContainer>
              {/* {console.table(csvColumns)} */}
              <ListContainer id="falseList">
                <List>
                  {csvColumns.filter((column) => !column.view).map((column, index) => (
                    <ListItem key={column.key} disablePadding>
                      <ListItemButton data-value={column.key} onClick={onFalseListCheck}>
                        <ListItemIcon>
                          <Checkbox checked={falseListCheck.find(list=>list === column.key) !== undefined ? true : false}/>
                        </ListItemIcon>
                        <ListItemText primary={column.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ListContainer>
              <ButtonGroup>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ margin: 1 }}
                  onClick={onAllViewTrue}
                >
                  ≫
                </Button>
                <Button variant="outlined" size="small" sx={{ margin: 1 }} onClick={onViewTrue}>&gt;</Button>
                <Button variant="outlined" size="small" sx={{ margin: 1 }} onClick={onViewFalse}>&lt;</Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ margin: 1 }}
                  onClick={onAllViewFalse}
                >
                  ≪
                </Button>
              </ButtonGroup>
              <ListContainer id="trueList">
                <List>
                  {csvColumns
                    .filter((column) => column.view)
                    .map((column) => (
                      <ListItem key={column.key} disablePadding>
                        <ListItemButton disabled={column.always} data-value={column.key} onClick={onTrueListCheck}>
                          <ListItemIcon>
                            <Checkbox checked={trueListCheck.find(list=>list === column.key) !== undefined ? true : false} />
                          </ListItemIcon>
                          <ListItemText primary={column.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </ListContainer>
            </ColumnContainer>
          </div>
        </Dialog>
      )}
      <Table>
        <TableHead style={{ backgroundColor: "lightblue" }}>
          <TableRow>
            {csvColumns.filter((column) => column.view).map((column) => (
              <TableCell key={column.key} align="center">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data) => {
            return (
              <TableRow key={data.condition_occurrence_id}>
                {csvColumns.filter((column) => column.view).map((column) => (
                  <TableCell align="center" key={column.key}>
                    {data[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
