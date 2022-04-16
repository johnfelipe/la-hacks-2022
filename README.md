# LA Hacks 2022 Project

# Frontend Build Guide

Use Homebrew to install Node

brew install node

## Build Guideline

git clone https://github.com/yuesha-yc/la-hacks-2022.git

Go to backend directory

cd backend

Setup virtual environment

python3 -m venv venv

If you are on windows, use 

python -m venv <path>

Next activate this environment

source venv/bin/activate

Install packages

pip3 install flask tensorflow tqdm scikit-learn matplotlib

# Run server on local host

Run the command to start flask

python3 server.py

Run the command to start react

npm start


