"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourceRouter = void 0;
const express_1 = require("express");
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
const buildResourcePayload = (resource) => {
    const baseUrl = getApiBaseUrl();
    const path = `/api/${resource}/`;
    return {
        resource,
        baseUrl,
        path,
        links: {
            self: `${baseUrl}${path}`,
            health: `${baseUrl}/api/health`,
        },
    };
};
const createResourceRouter = (resource) => {
    const router = (0, express_1.Router)();
    router.get('/', (_req, res) => {
        res.json(buildResourcePayload(resource));
    });
    return router;
};
exports.createResourceRouter = createResourceRouter;
