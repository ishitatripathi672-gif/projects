require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);

const app = require("./src/app")
const express = require("express");
const connectToDatabase = require("./src/config/database")

connectToDatabase();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});