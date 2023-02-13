command
status=$?
 
# Starting DEV environment to tests on position 0 of pm2 cluster 
echo 'Starting DEV environment to tests on position 0 of pm2 cluster '
pm2 start "npm run dev" --name jwt-demo-DEV

# Waiting server to start
echo 'Waiting for server...'
sleep 2

echo 'Running cypress test suite...'
cmd="./node_modules/.bin/cypress run --browser firefox"
$cmd
 
status=$?
 
# [ $status -eq 0 ] && pm2 delete 0 || echo "$cmd failed"
if [ $status -eq 0 ]
then
    # Deletes the dev instance
    echo 'Deleting DEV environment'
    pm2 kill
    # Build production instance
    npm run build
    # Start PROD instance inside pm2 cluster
    npm run start
else
    pm2 kill
    echo 'Your build has conflicts with the test suite, please run "npm run cypress" against your branch before deploy'
    exit 1
fi