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

### INFRASTRUCTURE 
|  [terraform](./terraform)    | hashicorp terraform          |   used it to create cloud infrastructure on Microsoft Azure   |







## 💻 Technologies

### Back-end
- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [CassandraDB](https://cassandra.apache.org/) -  An open-source NOSQL database management system
- [TypeScript] () - A superSet of javascript  that introduces types.
- [RabbitMQ] (https://rabbitmq.com) -  An open-source message broker software
- [MongoDB] (https://mongodb.com) - A NOSQL database management system
- [Docker](https://www.docker.com/) - A platform for developing, shipping and running applications
- [Kubernetes](https://kubernetes.io/) -  An open-source system for automating deployment, scaling, and management of containerized applications
- [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/) - NGINX Ingress Controller for Kubernetes
- [Skaffold](https://skaffold.dev/) - Handles the workflow for building, pushing and deploying applications
- [Terraform] (https://www.terraform.io) - An infrastructure as code software 
- [Jest](https://jestjs.io/) - A JavaScript testing framework




## 📙 About this Project

Continuing on my journey to expand my expertise in microservices architecture, I've successfully developed and orchestrated four distinct services, each addressing specific functionalities. This implementation has underscored my commitment to embracing the polyglot persistence approach, which led me to connect these services with two diverse NoSQL databases, MongoDB and Cassandra. By adopting this approach, I've ensured that each service is paired with the database technology that optimally complements its requirements.

My pursuit of knowledge in microservices also extends to Infrastructure. Employing Terraform, I skillfully orchestrated the creation of a Kubernetes cluster within the Azure cloud environment. This endeavor showcased my proficiency in infrastructure as code and validated my ability to seamlessly bridge the gap between development and operations. This accomplishment also exemplifies my readiness to harness the power of cloud computing and modern deployment practices to bolster the scalability and reliability of my microservices architecture.