"use client";

import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { GameOfThroneCharacter } from "../../../../shared/backend/got-characters/game-of-thrones-types";
import Image from "next/image";
import {
  GOTCardBackgroundWrapper,
  GOTCardContainer,
  GOTCardContent,
  GOTCardHouseShieldOverlayWrapper,
} from "./GOTCardComponents";
import GOTCardTitlesSection from "./GOTCardTitlesSection";

const GOTCardV1: React.FC<{ character: GameOfThroneCharacter }> = ({
  character,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}>
      <GOTCardContainer>
        <GOTCardBackgroundWrapper>
          <Image
            fill
            priority
            placeholder="blur"
            blurDataURL="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
            src={character.picture}
            alt={character.name}
            style={{ objectFit: "cover", filter: "brightness(70%)" }}
          />
        </GOTCardBackgroundWrapper>
        <GOTCardHouseShieldOverlayWrapper>
          <Image
            fill
            priority
            src={character.houseShieldUrl}
            alt={`${character.house} Shield`}
            style={{ objectFit: "cover" }}
          />
        </GOTCardHouseShieldOverlayWrapper>

        <GOTCardContent>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {character.name}
          </Typography>
          <Typography variant="subtitle1">House {character.house}</Typography>
          <GOTCardTitlesSection titles={character.titles} />
        </GOTCardContent>
      </GOTCardContainer>
    </motion.div>
  );
};

export default GOTCardV1;
