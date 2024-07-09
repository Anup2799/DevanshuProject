const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes/main');
const Detail = require("./models/Detail");
const Service = require("./models/Service")
const About = require("./models/About")




app.use(bodyParser.urlencoded({
    extended:true
}))





// Serve static files from the 'public' directory
app.use('/public', express.static("public"));

// Use the routes defined in 'routes/main'
app.use('', routes);



// Set the view engine to Handlebars
app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials")
// Connect to MongoDB using Mongoose
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Taskify', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Check if initial data for Service is already present, otherwise create it
        const serviceCount = await Service.estimatedDocumentCount();
        if (serviceCount === 0) {
            await Service.create([
                {
                    icon: 'fa-regular fa-image',
                    title: 'Provide best courses',
                    description: 'We provide courses that help our students in learning and placement',
                    linkText: 'http://www.learncodewithdurgesh.com',
                    link: 'Check'
                },
                {
                    icon: 'fa-regular fa-envelope',
                    title: 'Learn Projects',
                    description: 'We provide courses that help our students in learning and placement',
                    linkText: 'http://www.learncodewithdurgesh.com',
                    link: 'Check'
                },
                {
                    icon: 'fa-regular fa-envelope',
                    title: 'Learn Projects',
                    description: 'We provide courses that help our students in learning and placement',
                    linkText: 'http://www.learncodewithdurgesh.com',
                    link: 'Check'
                }
            ]);
            console.log("Service data created");
        }
        const aboutCount = await About.estimatedDocumentCount();
        if (aboutCount === 0) {
            await About.create([
                {
                    title: 'Provide best courses',
                    description: 'We provide courses that help our students in learning and placement',
                    link: 'Check'
                },
                
            ]);
            console.log("Service data created");
        }

        // Check if initial data for Detail is already present, otherwise create it
        const detailsCount = await Detail.estimatedDocumentCount();
        if (detailsCount === 0) {
            await Detail.create({
                brandName: "Taskify",
                brandIconUrl: "https://media.licdn.com/dms/image/C560BAQFLW67AuU46rg/company-logo_200_200/0/1675288007613?e=2147483647&v=beta&t=u_HcqE7uDWNZLc9sk773ZgCoGfGkkyW4U7e9BYKcvWo",
                links: [
                    { label: "Home", url: "/" },
                    { label: "Services", url: "/services" },
                    { label: "Gallery", url: "/gallery" },
                    { label: "About Us", url: "/about-us" },
                    { label: "Contact Us", url: "/contact-us" }
                ]
            });
            console.log("Initial data created");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process on connection failure
    }
};

const startServer = async () => {
    try {
        await connectToDB();
        const port = process.env.PORT || 5556;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit process if server start fails
    }
};

startServer();