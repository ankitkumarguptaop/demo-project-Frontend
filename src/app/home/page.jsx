"use client";
import Navbar from "@/components/navbar/navbar";
import { listEvent } from "@/features/event/event.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../components/event-card/card";
import { Box, Pagination } from "@mui/material";
import Nocontent from "../../assets/images/no-web-content-found.png";
import Image from "next/image";
import { MoonLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const isLoading = useSelector((state) => state.event.isLoading);
  console.log("✌️events --->", events.rows);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(listEvent({ limit, page, search }));
  }, [page, limit, search]);

  return (
    <Box sx={{ height: "100vh", width: "100vw", boxSizing: "border-box" }}>
      <Navbar setSearch={setSearch} setPage={setPage}></Navbar>
      {isLoading ? (
        <Box width={"100%"} sx={{display:"flex" ,justifyContent:"center"}}>
          <MoonLoader color="black" />
        </Box>
      ) : events?.rows?.length > 0 ? (
        <Box
          sx={{
            height: "80%",
            width: "100vw",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {events?.rows?.map((event) => {
            return (
              <EventCard
                key={event.id}
                name={event.name}
                details={event.details}
                image={event.image}
                price={event.ticket_price}
                totalSeats={event.seats}
                eventId={event.id}
              ></EventCard>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: "91%", position: "relative" }}>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }} // optional
            src={Nocontent}
            alt="no content"
          ></Image>
        </Box>
      )}
      {events?.rows?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={Math.ceil(events.count / limit)}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
