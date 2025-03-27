'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CreateEvent from "../book-seat-modal/modal";
import { useDispatch, useSelector } from 'react-redux';
import { countAllocatedSeats } from '@/features/seat/seat.action';
import { useEffect } from 'react';

export default function MediaCard({ image , name , details ,price ,totalSeats , eventId }) {
  const dispatch = useDispatch();
  const allocatedSeats = useSelector((state) => state.seat.count);
  const [open, setOpen] = React.useState(false);

    const [eventImage] = useState(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`
          .replace(/ /g, "%20")
          .replace(/\\/g, "/")
      );
      useEffect(() => {
        dispatch(countAllocatedSeats({ eventId: eventId }));
      }, []);
  return (
    <Card sx={{ maxWidth: 345 ,width:345 ,maxHeight:350 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={eventImage}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {details}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Seats   {parseInt(totalSeats)- parseInt(allocatedSeats)}/{totalSeats}  
        </Typography> 
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Ticket Price :  {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>setOpen(true)}  size="small">Book Ticket</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
        <CreateEvent open={open} setOpen={setOpen} price={price} eventId={eventId}></CreateEvent>
    </Card>
  );
}
