#!/bin/bash
. ./pass-prompt.sh
if [[ $? > 0 ]] ; then
	echo "Password prompt failed. Exiting..."
	exit
else
	echo "Password prompt succeeded. Continuing..."
fi

echo

echo "Starting MongoDB Database..."
echo $PASSWORD | sudo -S mongod --config /usr/local/etc/mongod.conf &
echo "MongoDB executed."

echo "Running Backend in the background..."
node ../latest/evoluteData/evoluteData.js &
echo "Backend initiated."

echo "Starting Frontend in the background..."
pushd ../latest/frontend && npm run dev &
echo "Frontend initiated."

