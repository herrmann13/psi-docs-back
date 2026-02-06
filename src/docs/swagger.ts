import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Psi-Docs API",
            version: "1.0.0"
        },
        servers: [{ url: "http://localhost:3000" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ bearerAuth: [] }],
        paths: {
            "/patients": {
                get: {
                    summary: "List patients or get by id",
                    parameters: [
                        {
                            name: "id",
                            in: "query",
                            required: false,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Success" },
                        "400": { description: "Invalid id" },
                        "404": { description: "Not found" }
                    }
                },
                post: {
                    summary: "Create patient",
                    responses: {
                        "201": { description: "Created" },
                        "400": { description: "Validation error" }
                    }
                }
            },
            "/patients/{id}": {
                put: {
                    summary: "Update patient",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Updated" },
                        "400": { description: "Validation error" },
                        "404": { description: "Not found" }
                    }
                },
                delete: {
                    summary: "Delete patient",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "204": { description: "Deleted" },
                        "404": { description: "Not found" }
                    }
                }
            },
            "/users": {
                get: {
                    summary: "List users or get by id",
                    parameters: [
                        {
                            name: "id",
                            in: "query",
                            required: false,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Success" },
                        "400": { description: "Invalid id" },
                        "404": { description: "Not found" }
                    }
                },
                post: {
                    summary: "Create user",
                    responses: {
                        "201": { description: "Created" },
                        "400": { description: "Validation error" }
                    }
                }
            },
            "/users/{id}": {
                put: {
                    summary: "Update user",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Updated" },
                        "400": { description: "Validation error" },
                        "404": { description: "Not found" }
                    }
                },
                delete: {
                    summary: "Delete user",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "204": { description: "Deleted" },
                        "404": { description: "Not found" }
                    }
                }
            },
            "/addresses": {
                get: {
                    summary: "List addresses or get by id",
                    parameters: [
                        {
                            name: "id",
                            in: "query",
                            required: false,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Success" },
                        "400": { description: "Invalid id" },
                        "404": { description: "Not found" }
                    }
                },
                post: {
                    summary: "Create address",
                    responses: {
                        "201": { description: "Created" },
                        "400": { description: "Validation error" }
                    }
                }
            },
            "/addresses/{id}": {
                put: {
                    summary: "Update address",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Updated" },
                        "400": { description: "Validation error" },
                        "404": { description: "Not found" }
                    }
                },
                delete: {
                    summary: "Delete address",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "204": { description: "Deleted" },
                        "404": { description: "Not found" }
                    }
                }
            },
            "/emergency-contacts": {
                get: {
                    summary: "List emergency contacts or get by id",
                    parameters: [
                        {
                            name: "id",
                            in: "query",
                            required: false,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Success" },
                        "400": { description: "Invalid id" },
                        "404": { description: "Not found" }
                    }
                },
                post: {
                    summary: "Create emergency contact",
                    responses: {
                        "201": { description: "Created" },
                        "400": { description: "Validation error" }
                    }
                }
            },
            "/emergency-contacts/{id}": {
                put: {
                    summary: "Update emergency contact",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "200": { description: "Updated" },
                        "400": { description: "Validation error" },
                        "404": { description: "Not found" }
                    }
                },
                delete: {
                    summary: "Delete emergency contact",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "integer" }
                        }
                    ],
                    responses: {
                        "204": { description: "Deleted" },
                        "404": { description: "Not found" }
                    }
                }
            }
        }
    },
    apis: []
};

export const swaggerSpec = swaggerJsdoc(options);
