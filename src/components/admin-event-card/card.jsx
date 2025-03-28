import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { countAllocatedSeats } from "@/features/seat/seat.action";
import { useEffect } from "react";
import CreateEvent from "../../components/event-create-modal/modal";
import { useDispatch } from "react-redux";

export default function MediaCard({
  image,
  name,
  details,
  status,
  seats,
  price,
  eventId,
}) {
  const dispatch = useDispatch();

  const [defaultValues, setdefaultValue] = useState({
    name: name,
    details: details,
    seats: seats,
    place: "",
    eventImage: "",
  });

  const [allocatedSeats, setAlloCatedSeats] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [eventImage] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );
  useEffect(() => {
    async function count() {
      const res = await dispatch(countAllocatedSeats({ eventId: eventId }));
      setAlloCatedSeats(res.payload.count);
      console.log("✌️res --->", res);
    }
    count();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, width: 345, maxHeight: 350 }}>
      <CardMedia sx={{ height: 140 }} image={eventImage} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {details}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Ticket Price : {price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Seats {parseInt(seats) - parseInt(allocatedSeats)}/{seats}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          sx={{
            backgroundColor:
              status === "approved"
                ? "green"
                : status === "rejected"
                ? "red"
                : "yellow",
            borderRadius: "5px",
            color: status === "pending" ? "black" : "white",
            padding: "3px",
          }}
        >
          {status === "approved"
            ? "Approved"
            : status === "rejected"
            ? "Rejected"
            : "Pending"}
        </Typography>
        <Button onClick={() => setOpen(true)} size="small">
          Update
        </Button>
      </CardActions>
      <CreateEvent
        isEdited={true}
        defaultValues={defaultValues}
        open={open}
        setOpen={setOpen}
      ></CreateEvent>
    </Card>
  );
}
