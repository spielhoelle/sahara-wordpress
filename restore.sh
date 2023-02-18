# # local
echo "Replace wordpress domain in dumpfile"
# dumpfile=$(ls -t | grep "sahara" | grep ".sql" | head -n 1)
# OLD_URL=http://sahara.tmy.io
# OLD_URL2=http://sahara.tmy.io
# NEW_URL=http://localhost:8000
# echo $dumpfile
# rm -f dump_updated.sql
# sed "s~$OLD_URL~$NEW_URL~g" $dumpfile >'dump_updated.sql'
# sed "s~$OLD_URL2~$NEW_URL~g" 'dump_updated.sql' >'dump_updated.sql'
sed 's,https://sahara.tmy.io,http://localhost:8000,g' sahara-2023-02-16.sql >dump_updated2.sql
sed 's,http://sahara.tmy.io,http://localhost:8000,g' dump_updated2.sql >dump_updated.sql
docker cp dump_updated.sql gmysql:/
docker exec gmysql /bin/bash -c "mysql -uroot -ppassword sahara < /dump_updated.sql"

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
