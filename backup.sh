echo "Backup DB"
db=sahara
ssh $wh docker exec globalmysql /bin/bash -c "mysqldump -uroot -psomewordpress $db > /$db-$(date +%Y-%m-%d).sql"
dumpfile=$(ssh $wh docker exec globalmysql ls / | grep ".sql" | head -n 1)
ssh $wh docker cp globalmysql:$dumpfile .
scp -rp $wh:~/$dumpfile .
docker exec gmysql /bin/bash -c "mysqldump -uroot -pwordpress $db > $db.sql"
docker cp gmysql:$db.sql .
echo "Done"
