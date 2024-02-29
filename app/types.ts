"use client";

import Image from "next/image";
import React, { useState } from "react";
import Select from "./Select";
import { get } from "http";

export type StepType = "start" | "culture";

export type CultureType =
  | "barding"
  | "dwarf"
  | "elf"
  | "hobbit"
  | "elf"
  | "bree";

export interface CharacterData {
  culture: CultureType | null;
}
