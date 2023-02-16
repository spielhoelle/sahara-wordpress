# # local
echo "Replace wordpress domain in dumpfile"
dumpfile=$(ls | grep ".sql" | tail -n 1)
OLD_URL=http://sahara.tmy.io
NEW_URL=http://localhost:8000
rm -f dump_updated.sql
sed "s~$OLD_URL~$NEW_URL~g" $dumpfile >'dump_updated.sql'
docker cp dump_updated.sql sahara-wordpress-db-1:/
docker exec sahara-wordpress-db-1 /bin/bash -c "mysql -uwordpress -pwordpress sahara < /dump_updated.sql"

# # remote
# dumpfile=$(ls | grep ".sql" | tail -n 1)
# sed "s~$OLD_URL~$NEW_URL~g" $dumpfile >$dumpfile
# echo "Move dump to server and inside docker container and insert dump into DB"
# scp -rp $dumpfile $wh:/
# ssh $wh docker cp /$dumpfile sahara_db_1:/
# ssh $wh docker exec sahara_db_1 /bin/bash -c "dumpfile=$(ls / | grep ".sql" | tail -n 1)"
# ssh $wh 'docker exec sahara_db_1 /bin/bash -c "mysql -uwordpress -pwordpress sahara < /$(ls / | grep ".sql" | tail -n 1)"'

# echo "Copy uploads folder in server"
# scp -rp wp-content/uploads $wh:www/sahara/wp-content/
