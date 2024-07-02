#!/bin/bash
rails s 2>&1 | grep pid: >stop.txt
cut -d ' ' -f '7' stop.txt >stop2.txt
saida=$(cut -d ',' -f '1' stop2.txt)
kill $saida
