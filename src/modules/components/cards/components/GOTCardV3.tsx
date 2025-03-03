"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";
import { GameOfThroneCharacter } from "../../../../shared/backend/got-characters/game-of-thrones-types";

const GOTCardV3: React.FC<{ character: GameOfThroneCharacter }> = ({
  character,
}) => {
  const { name, house, titles, picture, houseShieldUrl } = character;

  // Framer Motion variants for animations
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <Card
        sx={{
          maxWidth: 345,
          margin: "auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Character Image */}
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* House Shield */}
        <Avatar
          alt={`${house} Shield`}
          src={houseShieldUrl}
          sx={{
            width: 80,
            height: 80,
            border: "4px solid #fff",
            position: "absolute",
            top: 160,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <CardContent sx={{ textAlign: "center", mt: 6 }}>
          {/* Character Name */}
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>

          {/* House Name */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            House {house}
          </Typography>

          {/* Titles */}
          <Grid container justifyContent="center" spacing={1}>
            {titles.map((title, index) => (
              <Grid item key={index}>
                <Chip label={title} size="small" />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GOTCardV3;
