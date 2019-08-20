module.exports = {
  apps: [
    {
      name: "fetch-service",
      script: "index.js",
      cwd:"./fetch-service",
      autorestart: true,
      env:{
        track:"microservice"
      }
    },
    {
      name: "web-service",
      cwd: "./web-service",
      script: "index.js",
      autorestart: true
    },
    {
      name: "process-service",
      cwd: "./process-service",
      script: "index.js",
      autorestart: true
    }
  ]
};
