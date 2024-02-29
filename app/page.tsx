"use client";

import Image from "next/image";
import React, { useState } from "react";
import Select from "./Select";
import { CharacterData, CultureType, StepType } from "./types";
import { getDistinctiveFeatures } from "./tables";

function getStep(character: CharacterData): StepType {
  if (!character.culture) return "start";
  return "culture";
}

function Start({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="h-64">
        <p>The One Ring 2e Unofficial Character Creator</p>
        <button className="rounded-md bg-gray-100 py-2 px-4" onClick={onSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}
function Culture({
  character,
  onSubmit,
  setCharacter,
}: {
  character: CharacterData;
  setCharacter: (character: CharacterData) => void;
  onSubmit: () => void;
}) {
  const cultures = [
    {
      id: "barding",
      name: "Bardings",
    },
    { id: "dwarf", name: "Dwarves of Durins Folk" },
    { id: "hobbit", name: "Hobbits of the Shire" },
    { id: "elf", name: "Elves of Linden" },
    { id: "bree", name: "Men of Bree" },
  ] as {
    id: "barding" | "dwarf" | "elf" | "hobbit" | "elf" | "bree";
    name: string;
  }[];
  const cultureOption =
    cultures.find((c) => c.id === character.culture) || null;
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="h-64">
        <div>
          {"Ah yes, I've heard of the "}
          <Select
            className="w-48"
            options={cultures}
            selected={cultureOption}
            onChange={(selected) =>
              setCharacter({
                ...character,
                culture: selected.id as CultureType,
              })
            }
          />
          .
        </div>
        {character.culture ? (
          <button
            className="rounded-md bg-gray-100 py-2 px-4"
            onClick={onSubmit}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Attributes({
  character,
  onSubmit,
  setCharacter,
}: {
  character: CharacterData;
  setCharacter: (character: CharacterData) => void;
  onSubmit: () => void;
}) {
  const tempOptions = [
    {
      id: "1",
      name: "strong, hardy, and quick-witted",
    },
  ] as {
    id: string;
    name: string;
  }[];
  const tempOption =
    tempOptions.find((c) => c.id === character.attributeSetId) || null;

  const features = getDistinctiveFeatures();
  const selectedFeature =
    features.find((d) => d.id === character.featureId) || null;
  return (
    <div className="h-full flex flex-row justify-center items-center px-12">
      <div className="h-64">
        <div>
          One particular hero comes to mind. They say that this hero was{" "}
          <div>
            <Select
              className="w-full"
              options={tempOptions}
              selected={tempOption}
              onChange={(selected) =>
                setCharacter({
                  ...character,
                  attributeSetId: selected.id,
                })
              }
            />
            .
          </div>
          <div>
            They were known for being{" "}
            <Select
              options={features}
              selected={selectedFeature}
              onChange={(selected) =>
                setCharacter({
                  ...character,
                  featureId: selected.id,
                })
              }
            />
            .
          </div>
        </div>
        {character.attributeSetId ? (
          <button
            className="rounded-md bg-gray-100 py-2 px-4"
            onClick={onSubmit}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

function StepContent({
  character,
  step,
  setStep,
  setCharacter,
}: {
  character: CharacterData;
  setCharacter: (character: CharacterData) => void;
  step: StepType;
  setStep: (step: StepType) => void;
}) {
  switch (step) {
    case "culture":
      return (
        <Culture
          character={character}
          onSubmit={() => setStep("attributes")}
          setCharacter={setCharacter}
        />
      );
    case "attributes":
      return (
        <Attributes
          character={character}
          onSubmit={() => setStep("start")}
          setCharacter={setCharacter}
        />
      );
    default:
      return <Start onSubmit={() => setStep("culture")} />;
  }
}

function ImageSection({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gray-100 h-full" style={{ width: 600 }}>
      {children}
    </div>
  );
}

function StepSection({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 bg-white h-full">{children}</div>;
}

function Book({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  return <div className="flex flex-row h-full w-full">{children}</div>;
}

export default function Home() {
  const [character, setCharacter] = useState<CharacterData>({
    culture: null,
    attributeSetId: null,
    featureId: null,
  });
  const [step, setStep] = useState<StepType>(getStep(character));

  return (
    <main className="min-h-screen h-screen">
      <Book>
        <ImageSection>Test</ImageSection>
        <StepSection>
          <StepContent
            character={character}
            step={step}
            setStep={setStep}
            setCharacter={setCharacter}
          />
        </StepSection>
      </Book>
    </main>
  );
}
