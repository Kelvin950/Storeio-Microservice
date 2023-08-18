<h1 align="center">A Full Stack Auction Website</h1>


## 📝 Table of contents

- [Features](#-features)
- [Technologies](#-technologies)
- [About this Project](#-about-this-project)
- [Local Development](#-local-development)
- [License](#-license)

## ✨ Features

- User is able to create a store 
- User who owns a store can create product for the specific store
- Users can edit and delete a product that belongs to their store
- Users can make orders for products from different stores
- Store owners can fetch received orders




### Overview of services

| Service                             | Technologies               | Description             |
| ----------------------------------- | -------------------------- | ----------------------- |
| [Auth](./store-auth)         | TypeScript, MongodDB          | Handles user regristration, logging in, signing out and resetting users passwords  |
| [Product](./Product)        |  TypeScript, MongoDB           | creates, delete and update a specific stores product   |
|   [Stores](./Store)      |  TypeScript, MongoDB               | creates a store by an authorized user |
|  [orders](./orders)    | TypeScript, CassandraDB          |  Allows users to make orders for a product   |







## 💻 Technologies

### Back-end
- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [CassandraDB](https://www.mysql.com/) -  An open-source relational database management system
- [TypeScript]
- [RabbitMQ]
- [MongoDB]
- [Docker](https://www.docker.com/) - A platform for developing, shipping and running applications
- [Kubernetes](https://kubernetes.io/) -  An open-source system for automating deployment, scaling, and management of containerized applications
- [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/) - NGINX Ingress Controller for Kubernetes
- [Skaffold](https://skaffold.dev/) - Handles the workflow for building, pushing and deploying applications
- [Terraform]
- [Jest](https://jestjs.io/) - A JavaScript testing framework




## 📙 About this Project

This is my first project on microservices. I followed[Stephen Griders course on Microservices](https://www.udemy.com/course/microservices-with-node-js-and-react/).
However I am yet to add more functionalities of my own to it and I cannot wait to create more microservices projects.