"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { GameOfThroneCharacter } from "./game-of-thrones-types";

const GOTCardV4: React.FC<{ character: GameOfThroneCharacter }> = ({
  character,
}) => {
  const { name, house, titles, picture, houseShieldUrl } = character;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ display: "flex", justifyContent: "center" }} // Center the card
    >
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={picture}
          alt={name}
          sx={{
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            objectFit: "cover",
          }} // Rounded top corners
        />
        <CardContent sx={{ padding: "2rem" }}>
          <Box display="flex" alignItems="center" marginBottom="1rem">
            {" "}
            {/* Avatar and Name */}
            <Avatar
              src={houseShieldUrl}
              alt={house}
              sx={{
                width: 40,
                height: 40,
                marginRight: "1rem",
                border: "2px solid white",
              }}
            />
            <Typography variant="h5" component="div" fontWeight="bold">
              {name}
            </Typography>
          </Box>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            House {house}
          </Typography>

          {titles.map((title) => (
            <Chip
              key={title}
              label={title}
              sx={{ margin: "0.25rem", backgroundColor: "#e0e0e0" }}
            /> // Use Chips for titles
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GOTCardV4;
