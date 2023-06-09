import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Cancel from "@mui/icons-material/Cancel";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import supabase from "../config/supabase";


const Styledmodel = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Styledbox = styled(Box)({
  height: 500,
  backgroundColor: "#fff",
  borderRadius: 10,
  width: 500,
});

function J25EditModal({ item, setAnchorEl, openModel, setOpenModel }) {
  const [validation, setValidation] = useState(false);
  const [inputData, setInputData] = useState({
    user: "",
    date: "",
    file: "",
    dishname: "",
    category: "",
    price: "",
  });
  const { user, date, dishname, category, price } = inputData;
  const open = openModel;
  setAnchorEl(false);

  useEffect(() => {
    setInputData({
      user: item.user,
      date: item.date,
      dishname: item.dishname,
      category: item.category,
      price: item.price,
    });
  }, [item]);

  const editRecipeHandler = async () => {
    const { error } = await supabase
      .from("Datas")
      .update({ user, date, dishname, category, price })
      .eq("id", item.id);

    if (error) {
      alert("update error");
    } else {
      setOpenModel(false);
    }

    if (!user || !date || !dishname || !category || !price) {
      setValidation(true);
    } else {
      console.log(inputData);
      setInputData({
        user: "",
        date: "",
        file: "",
        dishname: "",
        category: "",
        price: "",
      });
    }
  };
  const recipes = [
    {
      name: "Biriyani",
    },
    {
      name: "Rice",
    },
    {
      name: "Juice",
    },
    {
      name: "Snacks",
    },
  ];

  return (
    <div>
      <Styledmodel open={open}>
        <Fade in={open}>
          <Styledbox>
            <Stack
              height="100%"
              direction="column"
              display="flex"
              alignItems="center"
              spacing={2}
            >
              <Box width="100%">
                <IconButton
                  sx={{ float: "right" }}
                  onClick={() => {
                    setOpenModel(false);
                  }}
                >
                  <Cancel />
                </IconButton>
              </Box>
              <Typography variant="h5">EDIT YOUR RECIPE</Typography>
              <Box
                height="280px"
                sx={{
                  m: 1,
                  minWidth: 120,
                }}
              >
                <Stack spacing={1}>
                 
                  <TextField
                    variant="standard"
                    label="User Name"
                    type="text"
                    value={user}
                    onChange={(e) => {
                      setInputData({ ...inputData, user: e.target.value });
                    }}
                  />

                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setInputData({ ...inputData, date: e.target.value });
                    }}
                  />
                  {/* <Input
                    placeholder="Image"
                    type="file"
                    value={file}
                    onChange={(e) => {
                      setInputData({ ...inputData, file: e.target.value });
                    }}
                  /> */}

                  <TextField
                    variant="standard"
                    label="Dishname"
                    type="text"
                    value={dishname}
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        dishname: e.target.value,
                      });
                    }}
                  />

                  <FormControl variant="standard">
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      value={category}
                      onChange={(e) => {
                        setInputData({
                          ...inputData,
                          category: e.target.value,
                        });
                      }}
                    >
                      {recipes.map((item) => {
                        return (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <Input
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setInputData({ ...inputData, price: e.target.value });
                    }}
                  />
                </Stack>
              </Box>
              {validation && (
                <Typography color="red">All Fields are Manditory</Typography>
              )}
              <Button
                onClick={() => {
                  editRecipeHandler();
                }}
                sx={{
                  backgroundColor: "red",
                }}
              >
                Edit
              </Button>
            </Stack>
          </Styledbox>
        </Fade>
      </Styledmodel>
    </div>
  );
}

export default J25EditModal;
