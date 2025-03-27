import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MediaCard({ image, name, details, status ,seats ,price  }) {
  const allocatedSeats = useSelector((state) => state.seat.count);
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Ticket Price :  {price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Seats   {parseInt(seats)- parseInt(allocatedSeats)}/{seats}  
        </Typography> 

      </CardContent>
      <CardActions>
        <Typography
          sx={{
            backgroundColor: status==='approved' ? "green" :   status==='rejected'? "red" :"yellow",
            borderRadius: "5px",
            color: status==='pending'? "black":"white",
            padding: "3px",
          }}
        >
          { status==='approved' ? "Approved" : status==='rejected'? "Rejected" : "Pending"}
        </Typography>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
