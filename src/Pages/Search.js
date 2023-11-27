
import { getUniversities } from "./xhr";
import ChipSelect from "./ChipSelect/ChipSelect";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import exportFromJSON from "export-from-json";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Search.css";
import { Filter } from "@mui/icons-material";
// import Database from "./data/Database3.json";




const context = require.context('./data_new', true, /.json$/);
const all_data = {};
let Database = [];
context.keys().forEach((key: any) => {
  const fileName = key.replace('./', '');
  const resource = require(`./data_new/${fileName}`);
  const namespace = fileName.split('_')[1].replace('.json', '');
  // all_data[namespace] = JSON.parse(JSON.stringify(resource));
  const temp = JSON.parse(JSON.stringify(resource));
  for (var i in temp) {

    Database.push(temp[i]);
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 58;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};
const Lead_ID = "Lead_ID";
const Professor_Name = "Professor Name";
const Professor_Email = "Professor Email";
const Country_Name = "Country_Name";
const University_ID = "University_ID";
const University_Name = "University_Name";
const QS_Rank = "QS_Rank";
const Departments_Name = "Department";
const Departments_Teg = "Department_Tag";
const Department_Identification = "Department Identification";
const Professor_Fellad_Teg = "Professor Fellad Teg";
const Prs_Links = "Prs Links";
const URL_LINKS = "URL LINKS";
const Field_Of_Research = "Field_of_Research";

function Search() {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function Exist(Datas, SpecialValue) {
    if (SpecialValue === '' || SpecialValue === undefined) return 0;

    const cap = SpecialValue.trim();
    let exist = 0;
    for (const key in Datas) {
      if (Datas[key].value === cap) exist = 1;
      if (Datas[key] === cap) exist = 1;
      if (cap.includes(Datas[key])) exist = 1;
      if (cap.includes(Datas[key].value)) exist = 1;
    }
    if (exist === 1) return 1;
    else return 0;
  }

  const[Database, setDatabase] = useState([]);

  const [Ranking, setRanking] = useState([]);
  const [Qs, setQs] = useState([]);

  const [Countrys, setSuggestions_Country] = useState([]);
  const [Country, setCountry] = useState([]);
  const Countrys_suggest = Countrys.map((item) => ({
    value: item,
    label: item,
  }));

  const [Universitys, setSuggestions_Universitys] = useState([]);
  const [University, setUniversity] = useState([]);
  const Universitys_suggest = Universitys.map((item) => ({
    value: item,
    label: item,
  }));

  const [Departments, setSuggestions_Departments] = useState([]);
  const [Department, setDepartment] = useState([]);
  const Departments_suggest = Departments.map((item) => ({
    value: item.value,
    Tag: item.Tag,
    label: item.value,
  }));

  const [FieldsOfResearch, setSuggestions_FieldsOfResearch] = useState([]);
  const [FieldOfResearch, setField] = useState([]);
  const FieldOfResearch_suggest = FieldsOfResearch.map((item) => ({
    value: item,
    label: item,
  }));

  useEffect(() => {
    getUniversities().then((response) =>
      setDatabase(response)
    );
  }, []);

  //-----------------------University QS Ranking--------------------
  useEffect(() => {
    let valueIndex = {};
    let Rankings = ["  Select All  "];
      for (const index in Database) {
        const element = Database[index];
        if (element[QS_Rank]) {
          if (!valueIndex[element[QS_Rank]]) {
            valueIndex[element[QS_Rank]] = true;
            Rankings.push(element[QS_Rank]);
          }
        }
      }

    for (let i = 0; i < Rankings.length; i++) {
      for (let j = 0; j < Rankings.length; j++) {
        if (
          parseInt(Rankings[i].split("-")[0]) <
          parseInt(Rankings[j].split("-")[0])
        ) {
          let ii = "";
          ii = Rankings[i];
          Rankings[i] = Rankings[j];
          Rankings[j] = ii;
        }
      }
    }
    setRanking(Rankings);
  }, [Database]);

  function handleChange_Qs(event) {
    let sel = event.target.value;
    let i = 0;
    let Ranking = [];
    for (const keyss in sel) {
      if (sel[keyss] === "  Select All  ") i = 1;
    }
    if (i === 1) {
      let valueIndex = {};

      for (const index in Database) {
        const element = Database[index];
        if (element[QS_Rank]) {
          if (!valueIndex[element[QS_Rank]]) {
            valueIndex[element[QS_Rank]] = true;

            Ranking.push(element[QS_Rank]);
          }
        }
      }

      for (let i = 0; i < Ranking.length; i++) {
        for (let j = 0; j < Ranking.length; j++) {
          if (
            parseInt(Ranking[i].split("-")[0]) <
            parseInt(Ranking[j].split("-")[0])
          ) {
            let ii = "";
            ii = Ranking[i];
            Ranking[i] = Ranking[j];
            Ranking[j] = ii;
          }
        }
      }
      const {
        target: { value },
      } = event;
      setQs(typeof value === "string" ? Ranking.split(",") : Ranking);
      i = 0;
    } else {
      const {
        target: { value },
      } = event;
      setQs(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
    setUniversity([]);
    setDepartment([]);
  }

  //----------------------------------Country----------------------------
  useEffect(() => {
    let valueIndex = {};
    let Countrys = ["  SELECT ALL  "];
    for (const index in Database) {
      const element = Database[index];
      if (element[Country_Name]) {
        if (!valueIndex[element[Country_Name].toUpperCase().trim()]) {
          valueIndex[element[Country_Name].toUpperCase().trim()] = true;
          const capitalized = element[Country_Name].toUpperCase().trim();
          Countrys.push(capitalized);
        }
      }
    }
    Countrys.sort();
    setSuggestions_Country(Countrys);
  }, [Database]);

  function handleChipChange_country(value) {
    let i = 0;
    for (const keyss in value) {
      if (value[keyss].value === "  SELECT ALL  ") {
        i = 1;
      }
    }
    if (i === 1) {
      let valueIndexs = {};
      let Countryss = [];
      for (const index in Database) {
        const element = Database[index];
        if (element[Country_Name]) {
          if (!valueIndexs[element[Country_Name].toUpperCase().trim()]) {
            valueIndexs[element[Country_Name].toUpperCase().trim()] = true;
            const capitalized = element[Country_Name].toUpperCase().trim();
            Countryss.push({
              value: capitalized,
              label: capitalized,
            });
          }
        }
      }
      Countryss.sort();
      setCountry(Countryss);
    } else {
      setCountry(value);
    }
    i = 0;
    setUniversity([]);
    setDepartment([]);
  }

  //-------------------------University----------------------------

  useEffect(() => {
    let valueIndex = {};
    let University = [];
    
    for (const index in Database) {
      const element = Database[index];

      if (element[University_Name]) {
        //console.log(Exist(Country,element,"Country"))
        if (Exist(Country, element[Country_Name].toUpperCase().trim()) && Exist(Qs, element[QS_Rank])) {
          const capitalized =
            element[University_Name].charAt(0).toUpperCase() +
            element[University_Name].slice(1);
          University.push(capitalized.trim());
        }
      }
      
    }
    
    University = University.filter(onlyUnique);
    University.sort();
    if (University.length > 0) University.splice(0, 0, "  Select All  "); 
    setSuggestions_Universitys(University);
  }, [Qs, Country]);

  function handleChipChange_University(value) {
    let i = 0,
      j = 0;
    for (const keyss in value) {
      if (value[keyss].value === "  Select All  ") {
        i = 1;
      }
    }
    if (i === 1) {
      let valueIndexs = {};
      let Universityss = [];
      for (const index in Database) {
        const element = Database[index];
        j += Exist(Country, element[Country_Name].toUpperCase().trim());
        j += Exist(Qs, element[QS_Rank]);
        if (element[University_Name].trim()) {
          if (!valueIndexs[element[University_Name].trim()]) {
            if (j === 2) {
              valueIndexs[element[University_Name].trim()] = true;
              const capitalized = element[University_Name].trim();
              Universityss.push({
                value: capitalized.trim(),
                label: capitalized.trim(),
              });
            }
          }
        }
        j = 0;
      }
      Universityss.sort();
      setUniversity(Universityss);
    } else setUniversity(value);
    setDepartment([]);
  }

  //---------------------------Department-------------------------
  useEffect(() => {
    let valueIndex = {};
    let Departments = [{ value: "  Select All  ", Tag: "All" }];
    let i = 0;
    for (const index in Database) {
      const element = Database[index];
      
      if (element[Departments_Name]) {
          const capitalized =
            element[Departments_Name].charAt(0).toUpperCase() +
            element[Departments_Name].slice(1);
            if (!valueIndex[element[Departments_Name].trim()]) {
              valueIndex[element[Departments_Name].trim()] = true;
              if (Exist(Country, element[Country_Name].toUpperCase().trim()) && Exist(Qs, element[QS_Rank]) && Exist(University, element[University_Name].trim())) {
                Departments.push({
                  value: capitalized.trim(),
                  Tag: element[Departments_Teg],
                  label: capitalized.trim(),
                });
              }
            }
      }
      i = 0;
    }
    //Departments.sort();
    // Departments = Departments.filter(onlyUnique);
    Departments.sort((a, b) => (a.value > b.value ? 1 : -1));
    setSuggestions_Departments(Departments);
  }, [Qs, Country, University]);

  function handleChipChange_Department(value) {
    let i = 0, j = 0;
    for (const keyss in value) {
      if (value[keyss].value === "  Select All  ") i = 1;
    }
    
    if (i === 1) {
      let valueIndexs = {};
      let Departmentss = [];
      for (const index in Database) {
        const element = Database[index];
        j += Exist(Country, element[Country_Name].toUpperCase().trim());
        j += Exist(Qs, element[QS_Rank]);
        j += Exist(University, element[University_Name]);
        if (element[Departments_Name]) {
          if (!valueIndexs[element[Departments_Name].trim()]) {
            if (j === 3) {
              valueIndexs[element[Departments_Name].trim()] = true;
              const capitalized =
                element[Departments_Name].charAt(0).toUpperCase() +
                element[Departments_Name].slice(1);
              Departmentss.push({
                value: capitalized.trim(),
                Tag: element[Departments_Teg],
                label: capitalized.trim(),
              });
            }
          }
        }
        j = 0;
      }
      Departmentss.sort();
      setDepartment(Departmentss);
    } else {
      setDepartment(value);
    }
  }

  //---------------------------Field of Research-------------------------
  useEffect(() => {
    let valueIndex = {};
    let fields = ["  Select All "];
    let i = 0;
    for (const index in Database) {
      const element = Database[index];

      i += Exist(Country, element[Country_Name].toUpperCase().trim());
      i += Exist(Qs, element[QS_Rank]);
      i += Exist(University, element[University_Name]);

      if (element[Field_Of_Research]) {
        if (!valueIndex[element[Field_Of_Research]]) {
          // valueIndex[element[Field_Of_Research]] = true;
          const capitalized =
            element[Field_Of_Research].charAt(0).toUpperCase() +
            element[Field_Of_Research].slice(1);
          const array = capitalized.split(",");
          if (i === 3) {
            array.forEach((el) => {
              fields.push(
                el.trim()
                // Tag:element[Departments_Teg]
              );
            });
          }
        }
      }
      i = 0;
    }
    //Departments.sort();
    fields = fields.filter(onlyUnique);
    fields.sort();
    setSuggestions_FieldsOfResearch(fields);
  }, [Qs, Country, University]);

  function handleChipChange_Field(value) {
    console.log(value);
    let i = 0;
    for (const keyss in value) {
      if (value[keyss].value.trim() === "Select All") {
        i = 1;
      }
    }
    if (i === 1) {
      let valueIndex = {};
      let fields = [];
      for (const index in Database) {
        const element = Database[index];
  
        if (element[Field_Of_Research]) {
          if (!valueIndex[element[Field_Of_Research]]) {
            valueIndex[element[Field_Of_Research]] = true;
            const capitalized = element[Field_Of_Research];/*element[Field_Of_Research].charAt(0).toUpperCase() + element[Field_Of_Research].slice(1)*/;
            const array =  capitalized.includes(',') ? capitalized.split(",") : [capitalized];
            
            if (Exist(Country, element[Country_Name].toUpperCase().trim()) && Exist(Qs, element[QS_Rank]) && Exist(University, element[University_Name])) {
              array.forEach((el) => {
                fields.push({
                  value: el.trim(),
                  label: el.trim()
                });
              });
            }
          }
        }
      }
      // console.log(fields);
      //Departments.sort();
      // fields = fields.filter(onlyUnique);
      fields.sort();
      setField(fields);
    } else setField(value);
  }

  //---------------------------toggle-------------------------
  const [alignment, setAlignment] = React.useState("department");
  
  const handleChangeAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //display table
  const [selected_departments_num, set_departments_num] = useState();

  function HandleSearch() {
    let selected_departments_num = 0;
    let Display_data = [];
    for (const index in Database) {
      const element = Database[index];
      for (const key in University) {
        if (University[key].value === element[University_Name].trim()) {
          if (alignment === 'department') {
            for (const key2 in Department) {
              if (Exist(Department, element[Departments_Name].trim())) {
                Display_data.push({
                  Lead_ID: element[Lead_ID].trim(),
                  FieldOfResearch: element[Field_Of_Research].trim(),
                  Department: element[Departments_Name].trim(),
                });
              }
              /*if (element[Departments_Teg] !== "") {

                if (Department[key2].Tag === element[Departments_Teg].trim()) {
                  Display_data.push({
                    Lead_ID: element[Lead_ID].trim(),
                    FieldOfResearch: element[Field_Of_Research].trim(),
                    // Country: element[Country_Name].trim(),
                    // University: element[University_Name].trim(),
                    // Department: element[Departments_Name].trim(),
                    // Tag: element[Departments_Teg].trim(),
                  });
                }
  
                if (
                  element[Departments_Teg].trim().includes(Department[key2].Tag)
                ) {
                  Display_data.push({
                    Lead_ID: element[Lead_ID].trim(),
                    FieldOfResearch: element[Field_Of_Research].trim(),
                    // Country: element[Country_Name].trim(),
                    // University: element[University_Name].trim(),
                    // Department: element[Departments_Name].trim(),
                    // Tag: element[Departments_Teg].trim(),
                  });
                }
  
                if (
                  Department[key2].Tag.includes(element[Departments_Teg].trim())
                ) {
                  Display_data.push({
                    Lead_ID: element[Lead_ID].trim(),
                    FieldOfResearch: element[Field_Of_Research].trim(),
                    // Country: element[Country_Name].trim(),
                    // University: element[University_Name].trim(),
                    // Department: element[Departments_Name].trim(),
                    // Tag: element[Departments_Teg].trim(),
                  });
                }
              }*/

            }
          } else {
            for (const key2 in FieldOfResearch) {
              if (element[Field_Of_Research] !== "") {
                if (
                  element[Field_Of_Research].trim().includes(FieldOfResearch[key2].value)
                ) {
                  Display_data.push({
                    Lead_ID: element[Lead_ID].trim(),
                    FieldOfResearch: element[Field_Of_Research].trim(),
                    // Country: element[Country_Name].trim(),
                    // University: element[University_Name].trim(),
                    Department: element[Departments_Name].trim(),
                    // Tag: element[Departments_Teg].trim(),
                  });
                }
              }
            }
          }
        }
      }
    }
    
    // var result = Display_data.reduce((unique, o) => {
    //   if (
    //     !unique.some(
    //       (obj) =>
    //         obj.Country === o.Country &&
    //         obj.University === o.University &&
    //         obj.Department === o.Department 
    //         && obj.Tag === o.Tag
    //     )
    //   ) {
    //     unique.push(o);
    //     selected_departments_num++;
    //   }
    //   return unique;
    // }, []);
    // setLinks(result);
    setLinks(Display_data);

    set_departments_num(selected_departments_num);
    let aa = 0,
      bb = 0,
      cc = 0,
      dd = 0,
      num = 0;
    for (const index in Database) {
      const element = Database[index];
      //console.log(element)
      const Country_Data = element[Country_Name].toUpperCase().trim();
      const University_Data = element[University_Name];
      const Qs_Data = element[QS_Rank];
      const Department_Data = element[Departments_Name];
      const Field_Data = element[Field_Of_Research];
      aa = Exist(Country, Country_Data);
      bb = Exist(University, University_Data);
      cc = Exist(Qs, Qs_Data);
      
      if (alignment === 'department') {
        dd = Exist(Department, Department_Data);
      } else {
        dd = Exist(FieldOfResearch, Field_Data);
      }

      if (aa === 0 || bb === 0 || cc === 0 || dd === 0) continue;
      if (aa === 1 && bb === 1 && cc === 1 && dd === 1) {
        num++;
      }
      aa = 0;
      bb = 0;
      cc = 0;
      dd = 0;
    }

    setNumber(num);
  }
  /*
useEffect(() => {
	
	let Display_data=[]
	for (const index in Database) 
	{
		const element = Database[index];
		for(const key in University)
		{
			if(University[key].value===element[University_Name].trim()) 
			{
				for(const key2 in Department)
				{
					if(element[Departments_Teg]!=="")
					{
						if(Department[key2].Tag===element[Departments_Teg].trim())
						{
							Display_data.push({
								Country:element[Country_Name].trim(),
								University:element[University_Name].trim(),
								Department:element[Departments_Name].trim(),
								Tag:element[Departments_Teg].trim()
							})
						}
						
						if(element[Departments_Teg].trim().includes(Department[key2].Tag))
						{
							Display_data.push({
								Country:element[Country_Name].trim(),
								University:element[University_Name].trim(),
								Department:element[Departments_Name].trim(),
								Tag:element[Departments_Teg].trim()
							})
						}
						
						if(Department[key2].Tag.includes(element[Departments_Teg].trim()))
						{
							Display_data.push({
								Country:element[Country_Name].trim(),
								University:element[University_Name].trim(),
								Department:element[Departments_Name].trim(),
								Tag:element[Departments_Teg].trim()
							})
						}
					} 
				}
			}
		}
	}
	var result = Display_data.reduce((unique, o) => {
		if(!unique.some(obj => obj.Country === o.Country && obj.University === o.University && obj.Department === o.Department && obj.Tag === o.Tag)) {
		  unique.push(o);
		}
		return unique;
	},[]);
	setLinks(result)


},[Department]);
*/
  //-------------------Download------------------------
  function HandleDownload(event) {
    let aa = 0,
      bb = 0,
      cc = 0,
      dd = 0;
    let Filtered = [];
    for (const index in Database) {
      const element = Database[index];

      const Country_Data = element[Country_Name].toUpperCase().trim();
      const University_Data = element[University_Name];
      const Qs_Data = element[QS_Rank];
      const Department_Data = element[Departments_Name];
      const Field_Data = element[Field_Of_Research];
      aa = Exist(Country, Country_Data);
      bb = Exist(University, University_Data);
      cc = Exist(Qs, Qs_Data);
      if (alignment === 'department') {
        dd = Exist(Department, Department_Data);
      } else {
        dd = Exist(FieldOfResearch, Field_Data);
      }

      if (aa === 0 || bb === 0 || cc === 0 || dd === 0) continue;
      if (aa === 1 && bb === 1 && cc === 1 && dd === 1) {
        Filtered.push({
          'Lead_ID': Database[index][Lead_ID],
          'Department': Database[index][Departments_Name],
          'Field_of_Research': Database[index][Field_Of_Research]
        });
      }
      aa = 0;
      bb = 0;
      cc = 0;
      dd = 0;
    }
    console.log(Filtered);
    if (Filtered.length === 0) handleClickOpen();
    
    if (Filtered.length > 0 && event.target.value === "JSON")
      saveToFile("Filtered_Data.json", JSON.stringify(Filtered));

    if (Filtered.length > 0 && event.target.value === "CSV") {
      const items = Filtered;
      const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
      const headers = Object.keys(items[0]);
      const csv = [
        headers.join(","), // header row first
        ...items.map((row) =>
          headers
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(",")
        ),
      ].join("\r\n");
      saveToFile("Filtered_Data.csv", csv);
    }

    if (Filtered.length > 0 && event.target.value === "XML") {
      const data = Filtered; //dataForXml
      const fileName = Filtered.fileName ? Filtered.fileName : "exported";
      let fields = Filtered.fields ? Filtered.fields : []; //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
      const exportType = "xml";
      exportFromJSON({ data, fileName, fields, exportType });
    }
  }

  const [Filtered_PHD, setNumber] = useState();
  const [Filtered_data, setLinks] = useState([]);

  function saveToFile(fileName, textData) {
    const blobData = new Blob([textData], { type: "text/plain" });
    const urlToBlob = window.URL.createObjectURL(blobData);

    const a = document.createElement("a");
    a.style.setProperty("display", "none");
    document.body.appendChild(a);
    a.href = urlToBlob;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(urlToBlob);
    a.remove();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //------------------Talble------------------------

  //render
  return (
    <>
      <div
        className="w-full max-w-sm pt-64 pb-224"
        style={{ marginTop: "50px" }}
      >
        <br />
        <Typography className="text-24 mt-24 mb-8" component="h2">
          University Qs Rankings
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-checkbox-label">QS</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={Qs}
            color="primary"
            onChange={handleChange_Qs}
            input={<OutlinedInput id="select-multiple-chip" label="QS" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Ranking.map((name) =>
              name === "  Select All  " ? (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ) : (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={Qs.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <br />
        <br />
        <Typography className="text-24 mt-24 mb-8" component="h2">
          Country
        </Typography>

        <ChipSelect
          className="w-full my-16"
          value={Country}
          onChange={handleChipChange_country}
          placeholder="Select Countrys"
          textFieldProps={{
            label: "Country",
            InputLabelProps: {
              shrink: true,
            },
            variant: "outlined",
          }}
          options={Countrys_suggest}
          isMulti
        />
        <br />
        <Typography className="text-24 mt-24 mb-8" component="h2">
          University
        </Typography>

        <ChipSelect
          className="w-full my-16"
          value={University}
          onChange={handleChipChange_University}
          placeholder="Select Universitys"
          textFieldProps={{
            label: "University",
            InputLabelProps: {
              shrink: true,
            },
            variant: "outlined",
          }}
          options={Universitys_suggest}
          isMulti
        />
        <br />
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChangeAlignment}
          aria-label="Platform"
          defaultValue="department"
        >
          <ToggleButton value="department">Department</ToggleButton>
          <ToggleButton value="field">Field of Research</ToggleButton>
        </ToggleButtonGroup>
        <br />
        <br />
        <div style={{ display: alignment === 'department' ? 'block' : 'none' }}>
          <Typography className="text-24 mt-24 mb-8" component="h2">
            Department
          </Typography>
          <ChipSelect
            className="w-full my-16"
            value={Department}
            onChange={handleChipChange_Department}
            placeholder="Select Departments"
            textFieldProps={{
              label: "Department",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={Departments_suggest}
            isMulti
          />
        </div>
        <br />
        <div style={{ display: alignment === 'field' ? 'block' : 'none' }}>
          <Typography className="text-24 mt-24 mb-8" component="h2">
            Field of Research
          </Typography>
          <ChipSelect
            className="w-full my-16"
            value={FieldOfResearch}
            onChange={handleChipChange_Field}
            placeholder="Select Field"
            textFieldProps={{
              label: "FieldofResearch",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={FieldOfResearch_suggest}
            isMulti
          />
        </div>
        <br />
        <br />
      </div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={HandleSearch}>
          Search
        </Button>
        {Filtered_PHD > 0 ? (
          <div>
            You got {Filtered_PHD} Ph.D leads form {selected_departments_num}{" "}
            departments. A list of filtered departments is given below
          </div>
        ) : (
          <></>
        )}
      </Stack>
      <br />
      {Filtered_data.length > 0 ? (
        <TableContainer component={Paper} className="tableContainer">
          <Table
            sx={{ minWidth: 750 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right" width="20%">Lead-ID</TableCell>
                <TableCell align="left" width="20%">Department</TableCell>
                <TableCell align="left" width="60%">Field of Research</TableCell>
                {/* <TableCell align="right">Country</TableCell>
                <TableCell align="right">University Name</TableCell>
                <TableCell align="right">Department Name</TableCell>
                <TableCell align="right">Departments Teg</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Filtered_data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row["Lead_ID"]}</TableCell>
                  <TableCell align="left">{row["Department"]}</TableCell>
                  <TableCell align="left">{row["FieldOfResearch"]}</TableCell>
                  {/* <TableCell align="right">{row["Country"]}</TableCell>
                  <TableCell align="right">{row["University"]}</TableCell>
                  <TableCell align="right">{row["Department"]}</TableCell>
                  <TableCell align="right">{row["Tag"]}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}

      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={HandleDownload} value={"JSON"}>
            Download JSON
          </Button>
          <Button variant="contained" onClick={HandleDownload} value={"CSV"}>
            Download CSV
          </Button>
          <Button variant="contained" onClick={HandleDownload} value={"XML"}>
            Download XML
          </Button>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Filtered Database"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  There is no datas. Please select all options.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Stack>
        <br />
      </div>
    </>
  );
}
export default Search;
