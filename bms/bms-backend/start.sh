#!/bin/sh

echo "Starting backend server..."

pm2-runtime start ecosystem.config.js