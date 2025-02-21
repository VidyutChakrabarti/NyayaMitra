@echo off
cd backend 
start python api.py
cd ../
start npm run dev 
cd frontend 
start npm run dev
cd ../
start code .

