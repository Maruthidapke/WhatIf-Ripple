#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Ensure local node binary is on PATH
if [ -d "$HOME/.local/node/bin" ]; then
  export PATH="$HOME/.local/node/bin:$PATH"
fi

echo "=========================================================="
echo " Starting WhatIf? (Ripple Engine) Full-Stack Application  "
echo "=========================================================="
echo " Frontend URL: http://localhost:5173"
echo " Backend API:  http://localhost:5002"
echo "=========================================================="

npm run dev
