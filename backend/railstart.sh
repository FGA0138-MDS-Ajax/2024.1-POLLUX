#!/bin/bash
rails db:migrate
nohup rails s &
