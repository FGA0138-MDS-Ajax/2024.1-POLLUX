#!/bin/bash
lsof -i:5173 | grep LISTEN > stop.txt
saida=$(cut -d ' ' -f '5' stop.txt)
kill $saida
