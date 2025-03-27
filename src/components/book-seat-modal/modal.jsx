"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import styles from "./modal.module.css";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl } from "@mui/material";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, price, eventId }) {
  const formSchema = z.object({
    totalSeats: z.string().min(1, "Enter valid total seats"),
  });

  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalSeats: "",
    },
  });

  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    console.log("✌️data --->", data);
    const res = await dispatch(
      allocateSeats({ eventId: eventId, totalSeats: totalSeats })
    );
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Sucessfuly Event created in", {
        variant: "success",
        autoHideDuration: 5000,
      });
      reset();
    }
    handleClose();
  };

  return (
    <FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Input
              width="100%"
              lable={"Total Seats"}
              register={register}
              feildName="totalSeats"
              margin={"10px 0px"}
              errors={errors}
            ></Input>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: "9px 5px",
              }}
            >
              <Button
                onClick={handleSubmit(onSubmit)}
                sx={{ color: "white", backgroundColor: "green" }}
              >
                Book
              </Button>
              <Button
                onClick={handleClose}
                sx={{ color: "white", backgroundColor: "red" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </LocalizationProvider>
    </FormControl>
  );
}
