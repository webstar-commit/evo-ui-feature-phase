#!/bin/bash

. ./pass-prompt.sh

if [[ $? > 0 ]] ; then
     echo "Password prompt failed. Exiting..."
     exit  
else
     echo "Password prompt succeeded. Continuing..."
fi

if [[ $? > 0 ]] ; then
     echo "Password prompt failed. Exiting..."
     exit
else
     echo "Password prompt succeeded. Continuing..."
fi

echo
#echo "Done. Password=$password"

echo "Stopping Backend..."
echo $PASSWORD | sudo -S killall node
echo "Backend termination sent."

echo "Stopping Frontend..."
echo $PASSWORD | sudo -S killall npm
echo "Frontend termination sent."

