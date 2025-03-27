"use client";
import Navbar from "@/components/navbar/navbar";
import { listAdminEvent, listPendingEvent } from "@/features/event/event.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../components/super-admin-event-card/card";
import { Box, Button, Pagination } from "@mui/material";
import Nocontent from "../../assets/images/no-web-content-found.png";
import Image from "next/image";
import { MoonLoader } from "react-spinners";

const Admin = () => {
  const dispatch = useDispatch();
  const pendingEvents = useSelector((state) => state.event.pendingEvents);
  const isLoading = useSelector((state) => state.event.isLoading);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(listPendingEvent({ limit, page, search }));
  }, [page, limit, search]);

  return (
    <Box sx={{ height: "100vh", width: "100vw", boxSizing: "border-box" }}>
      <Navbar setSearch={setSearch} setPage={setPage}></Navbar>
      {isLoading ? (
        <Box width={"100%"} sx={{ display: "flex", justifyContent: "center" }}>
          <MoonLoader color="black" />
        </Box>
      ) : pendingEvents?.rows?.length > 0 ? (
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
          {pendingEvents?.rows?.map((event) => {
            return (
              <EventCard
                key={event.id}
                name={event.name}
                details={event.details}
                image={event.image}
                seats={event.seats}
                isApproved={event.status}
                id ={event.id}
                price={event.ticket_price}
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
      {pendingEvents?.rows?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={Math.ceil(pendingEvents?.count / limit)}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      )}
    
    </Box>
  );
};

export default Admin;
