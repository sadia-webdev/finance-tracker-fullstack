import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for our finance tracker application",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://finance-tracker-api-1n66.onrender.com/"
            : "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Where your route files live
};

export const swaggerSpec = swaggerJSDoc(options);
