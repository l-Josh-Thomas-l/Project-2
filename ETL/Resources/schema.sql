-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Country" (
    "Country" VARCHAR   NOT NULL,
    "Continent" VARCHAR   NOT NULL,
    "Abbreviation_2" VARCHAR   NOT NULL,
    "Abbreviation_3" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Country" PRIMARY KEY (
        "Country"
     )
);

CREATE TABLE "Production" (
    "Country" VARCHAR   NOT NULL,
    "Yield_type" VARCHAR   NOT NULL,
    "Year" INTEGER   NOT NULL,
    "Value(kg/ha)" NUMERIC   NOT NULL,
    "Continent" VARCHAR   NOT NULL,
    "Abbreviation_2" VARCHAR   NOT NULL,
    "Abbreviation_3" VARCHAR   NOT NULL
);

CREATE TABLE "GDP" (
    "Country" VARCHAR   NOT NULL,
    "Year" INTEGER   NOT NULL,
    "GDP_per_capita" NUMERIC   NOT NULL,
    "Continent" VARCHAR   NOT NULL,
    "Abbreviation_2" VARCHAR   NOT NULL,
    "Abbreviation_3" VARCHAR   NOT NULL
);

CREATE TABLE "Fertilizer" (
    "Country" VARCHAR   NOT NULL,
    "Year" INTEGER   NOT NULL,
    "Nitrogen(kg/ha)" NUMERIC   NOT NULL,
    "Potash(kg/ha)" NUMERIC   NOT NULL,
    "Phosphate(kg/ha)" NUMERIC   NOT NULL,
    "Continent" VARCHAR   NOT NULL,
    "Abbreviation_2" VARCHAR   NOT NULL,
    "Abbreviation_3" VARCHAR   NOT NULL
);

ALTER TABLE "Production" ADD CONSTRAINT "fk_Production_Country" FOREIGN KEY("Country")
REFERENCES "Country" ("Country");

ALTER TABLE "GDP" ADD CONSTRAINT "fk_GDP_Country" FOREIGN KEY("Country")
REFERENCES "Country" ("Country");

ALTER TABLE "Fertilizer" ADD CONSTRAINT "fk_Fertilizer_Country" FOREIGN KEY("Country")
REFERENCES "Country" ("Country");

