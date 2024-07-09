const express = require('express');
const routes = express.Router();
const Detail = require("../models/Detail");
const Service = require("../models/Service");
const Contact = require("../models/Contact")
const About = require("../models/About");



routes.get("/", async (req, res) => {
    try {
        const details = await Detail.findOne({ "_id": "668aace8544801df12dcef6d" }).exec();
        const services = await Service.find().exec();
        const about = await About.find().exec();
        console.log(details);
        res.render("index", { details: details, services: services ,about:about});
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).send("Error fetching details");
    }
});

routes.get("/gallery", async (req, res) => {
    try {
        const details = await Detail.findOne({ "_id": "668aace8544801df12dcef6d" }).exec();
        console.log(details);
        res.render("gallery", { details: details});
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).send("Error fetching details");
    }
});

routes.post("/process-contact-form",(request,response) =>{
    console.log("Form is submitted")
    console.log(request.body)

    try{
        const data=Contact.create(request.body)
        console.log(data)
        response.redirect("/")
    }catch(e)
    {
        console.log(e)
        response.redirect("/")
    }
})



module.exports = routes;

