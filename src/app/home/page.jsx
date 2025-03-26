"use client";
import Navbar from "@/components/navbar/navbar";
import { listEvent } from "@/features/event/event.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../components/event-card/card";
import { Box, Pagination } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  console.log("✌️events --->", events.rows);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(listEvent({ limit, page, search }));
  }, [page, limit, search]);

  return (
    <> 
      <Navbar setSearch={setSearch} setPage={setPage}></Navbar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
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
            ></EventCard>
          );
        })}
      </Box>
      <Box
        sx={{
          margin: "15px",
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
    </>
  );
};

export default Home;
