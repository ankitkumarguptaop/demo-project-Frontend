import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { listAllEvent, updateEvent } from "@/features/event/event.action";

export default function MediaCard({
  image,
  name,
  details,
  seats,
  id,
  price,
  status,
}) {
  const dispatch = useDispatch();

  const [eventImage] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`
      .replace(/ /g, "%20")
      .replace(/\\/g, "/")
  );
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
          Total Seats : {seats} Ticket Price : {price}
        </Typography>
      </CardContent>
      {status === "pending" ? (
        <CardActions>
          <Button
            onClick={() =>{
              dispatch(updateEvent({ id: id, status: "approved" }))
              dispatch(listAllEvent({ limit:5, page:1, search:"", status:"" }))

            }
            }
            size="small"
          >
            Approve
          </Button>
          <Button
            onClick={() =>{
              dispatch(updateEvent({ id: id, status: "rejected" }))
              dispatch(listAllEvent({ limit:5, page:1, search:"", status:"" }))
            }
            }
              
            
            size="small"
          >
            Reject
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Typography
            sx={{
              backgroundColor: status === "approved" ? "green" : "red",
              borderRadius: "5px",
              color: "white",
              padding: "3px",
            }}
          >
            {status === "approved" ? "Approved" : "Rejected"}
          </Typography>
          <Button size="small">Learn More</Button>
        </CardActions>
      )}
    </Card>
  );
}
