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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, Typography } from "@mui/material";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { allocateSeats, countAllocatedSeats } from "@/features/seat/seat.action";

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
    totalSeats: z
      .string()
      .refine((val) => !isNaN(val) && parseInt(val) > 0, {
        message: "Total seats must be greater than 0",
      }),
  });

  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors ,isValid},
    reset,
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalSeats: "",
    },
    mode: "onChange",
  });
  const totalSeats = watch("totalSeats");
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    console.log("✌️data --->", data);
    const res = await dispatch(
      allocateSeats({ eventId: eventId, totalSeats: data.totalSeats })
    );
    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Sucessfuly allocated seats ", {
        variant: "success",
        autoHideDuration: 5000,
      });
      dispatch(countAllocatedSeats({ eventId: eventId }));
      reset();
    }
    handleClose();
  };

  return (
    <FormControl>
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isValid && totalSeats !== "" ? `Total Price : ${price * parseInt(totalSeats)}` : ""}
          </Typography>
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
              disabled={!isValid}
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
    </FormControl>
  );
}
