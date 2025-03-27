'use client'
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import style from "./input.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  lable,
  width,
  register,
  feildName,
  pattern,
  errors,
  margin,
  isPassword=false
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <TextField
        type={ isPassword ? showPassword ? "text" : "password" : "text"}
        className={style.input}
        variant="outlined"
        label={lable}
        {...register(feildName, {
          pattern: { value: pattern, message: `Invalid  ${feildName}` },
          required: { value: true, message: `${feildName} Required ` },
        })}
        error={errors[feildName]}
        sx={{
          margin: margin ,
          width: width,
          input: {
            alignContent: "center",
            height: "39px",
            padding: "7px",
            color: "#808080",
            fontWeight: "light",
          },
        }}

    InputProps={{ 
             endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                { isPassword  ? showPassword ? <Visibility /> : <VisibilityOff /> :<></>}
              </IconButton>
            </InputAdornment> 
          )
        }}
      ></TextField>
      {errors[feildName] && (
        <p style={{ color: "red"  ,margin:"0px 0px"}}>{errors[feildName].message}</p>
      )}
    </>
  );
};

export default Input;