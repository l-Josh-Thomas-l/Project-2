import numpy as np
import psycopg2
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect, create_engine, func

from flask import Flask, jsonify, render_template

from config import password


#################################################
# Database Setup
#################################################
engine = (create_engine('postgresql://postgres:postgres@localhost:5432/fertilizer_db'))

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Country_base=Base.classes.Country
# GDP_base=Base.classes.GDP
# Fertilizer_base=Base.classes.Fertilizer
# Production_base=Base.classes.Production

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    # return render_template("index.html")
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/Country<br/>"
        f"/api/v1.0/GDP<br/>"
        f"/api/v1.0/fertilizer<br/>"
        f"/api/v1.0/production<br/>"
    )

@app.route("/api/v1.0/Country")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Perform a query to retrieve the date and precipitation scores
    results = session.query(Country_base.Country, Country_base.Continent, Country_base.Abbreviation_2, Country_base.Abbreviation_3).all() 

    # Create a dictionary from the row data and append to a list of all_precipitations
    all_countries = []

    for Country in results:
        countries_dict = {}
        countries_dict["Country"] = Country.Country
        countries_dict["Continent"] = Country.Continent
        countries_dict["Abbreviation_2"] = Country.Abbreviation_2
        countries_dict["Abbreviation_3"] = Country.Abbreviation_3
        all_countries.append(countries_dict)

    return jsonify(all_countries)


# @app.route("/api/v1.0/GDP")
# def names1():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Perform a query to retrieve the date and precipitation scores
#     results = session.query(GDP_base.Country, GDP_base.Year, GDP_base.GDP_per_capita, GDP_base.Continent, GDP_base.Abbreviation_2, GDP_base.Abbreviation_3).all() 

#     # Create a dictionary from the row data and append to a list of all_precipitations
#     all_GDP = []

#     for GDP in results:
#         GDP_dict = {}
#         GDP_dict["Country"] = GDP.Country
#         GDP_dict["Year"] = GDP.Year
#         GDP_dict["GDP_per_capita"] = GDP.GDP_per_capita
#         GDP_dict["Continent"] = GDP.Continent
#         GDP_dict["Abbreviation_2"] = GDP.Abbreviation_2
#         GDP_dict["Abbreviation_3"] = GDP.Abbreviation_3
#         all_GDP.append(GDP_dict)

#     return jsonify(all_GDP)

# @app.route("/api/v1.0/Fertilizer")
# def names2():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Perform a query to retrieve the date and precipitation scores
#     results = session.query(Fertilizer_base.Country, Fertilizer_base.Year, Fertilizer_base.Nitrogen(kg/ha), Fertilizer_base.Potash(kg/ha), Fertilizer_base.Phosphate(kg/ha), Fertilizer_base.Continent, Fertilizer_base.Abbreviation_2, Fertilizer_base.Abbreviation_3).all() 

#     # Create a dictionary from the row data and append to a list of all_precipitations
#     all_Fertilizer = []

#     for Fertilizer in results:
#         Fertilizer_dict = {}
#         Fertilizer_dict["Country"] = Fertilizer.Country
#         Fertilizer_dict["Year"] = Fertilizer.Year
#         Fertilizer_dict["Nitrogen"] = Fertilizer.Nitrogen(kg/ha)
#         Fertilizer_dict["Potash"] = Fertilizer.Potash(kg/ha)
#         Fertilizer_dict["Phosphate"] = Fertilizer.Phosphate(kg/ha)
#         Fertilizer_dict["Continent"] = Fertilizer.Continent
#         Fertilizer_dict["Abbreviation_2"] = Fertilizer.Abbreviation_2
#         Fertilizer_dict["Abbreviation_3"] = Fertilizer.Abbreviation_3
#         all_Fertilizer.append(Fertilizer_dict)

#     return jsonify(all_Fertilizer)

# @app.route("/api/v1.0/Production")
# def names3():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Perform a query to retrieve the date and precipitation scores
#     results = session.query(Production_base.Country, Production_base.Yield_type, Production_base.Year, Production_base.Value(kg/ha), Production_base.Continent, Production_base.Abbreviation_2, Production_base.Abbreviation_3).all() 

#     # Create a dictionary from the row data and append to a list of all_precipitations
#     all_Production = []

#     for Production in results:
#         Production_dict = {}
#         Production_dict["Country"] = Production.Country
#         Production_dict["Yield_type"] = Production.Yield_type
#         Production_dict["Year"] = Production.Year
#         Production_dict["Value(kg/ha)"] = Production.Value(kg/ha)
#         Production_dict["Continent"] = Production.Continent
#         Production_dict["Abbreviation_2"] = Production.Abbreviation_2
#         Production_dict["Abbreviation_3"] = Production.Abbreviation_3
#         all_Production.append(Production_dict)

#     return jsonify(all_Production)

if __name__ == '__main__':
    app.run()