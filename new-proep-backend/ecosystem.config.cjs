module.exports = {
    apps: [{
        name: "new-proep-backend",
        script: "src/server.js",
        cwd: "/var/www/new-proep/new-proep-backend",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "500M",
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 3001
        }
    }]
};
