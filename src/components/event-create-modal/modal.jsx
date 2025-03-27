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
import { createEvent } from "@/features/event/event.action";

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

export default function BasicModal({open ,setOpen}) {
  const [date, setDate] = useState(null);
  const formSchema = z.object({
    details: z
      .string()
      .transform((value) => value.replace(/\s+/g, ""))
      .pipe(z.string().min(10, "Enter valid details")),
    place: z
      .string()
      .transform((value) => value.replace(/\s+/g, ""))
      .pipe(z.string().min(3, "Enter valid Place")),
    name: z
      .string()
      .transform((value) => value.replace(/\s+/g, ""))
      .pipe(z.string().min(3, "Enter valid Name")),
    eventImage: z.any(),
    seats: z.string().min(1, "Enter valid total seats"), 
    price: z.string().min(1, "Enter valid ticket price"),
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
      name: "",
      details: "",
      seats: "",
      place: "",
      eventImage: "",
    },
  });


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("✌️file --->", file);
    if (file) {
      setValue("eventImage", file);
    }
  };

  const onSubmit = async (data) => {
    console.log("✌️data --->", data);
    let formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("details", data.details);
    formdata.append("timing", date);
    formdata.append("place", data.place);
    formdata.append("seats", data.seats);
    formdata.append("image", data.eventImage);
    formdata.append("ticketPrice", data.price);

    const res = await dispatch(createEvent(formdata));

    if (res.meta.requestStatus === "fulfilled") {
      enqueueSnackbar("Sucessfuly Event created in", {
        variant: "success",
        autoHideDuration: 5000,
      });
      reset();
    }
    handleClose()
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
                lable={"Enter event name"}
                register={register}
                feildName="name"
                margin={"10px 0px"}
                errors={errors}
              ></Input>
              <Input
                width="100%"
                lable={"Details"}
                register={register}
                feildName="details"
                margin={"10px 0px"}
                errors={errors}
              ></Input>

              <Input
                width="100%"
                lable={"Place"}
                register={register}
                feildName="place"
                margin={"10px 0px"}
                errors={errors}
              ></Input>
              <Input
                width="100%"
                lable={"Total Seats"}
                register={register}
                feildName="seats"
                margin={"10px 0px"}
                errors={errors}
              ></Input>
               <Input
                width="100%"
                lable={"Ticket Price"}
                register={register}
                feildName="price"
                margin={"10px 0px"}
                errors={errors}
              ></Input>
              <DateTimePicker
                width="100%"
                slotProps={{ textField: { fullWidth: true } }}
                value={date}
                onChange={(value) => setDate(value)}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
              />
              <Box
                sx={{ width: "90%", marginTop: "5px" }}
                variant="contained"
                component="label"
              >
                <input
                  id={styles["input"]}
                  type="file"
                  onChange={handleImageUpload}
                />
              </Box>
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
                  Create
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{ color: "white", backgroundColor: "red" }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </LocalizationProvider>
      </FormControl>

  );
}
