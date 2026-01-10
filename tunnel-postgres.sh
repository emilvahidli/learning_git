#!/bin/bash
echo "🚇 Starting PostgreSQL SSH tunnel..."
echo "📍 Local port: 5433"
echo "📍 Remote: 78.46.213.237:5432"
echo "⚠️  Keep this terminal open!"
echo ""
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
