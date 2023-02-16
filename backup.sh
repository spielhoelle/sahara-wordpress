echo "Backup DB"
ssh $wh docker exec sahara-wordpress_db_1 /bin/bash -c "mysqldump -uwordpress -psomewordpress sahara > /sahara-$(date +%Y-%m-%d).sql"
dumpfile=$(ssh $wh docker exec sahara-wordpress_db_1 ls / | grep ".sql" | head -n 1)
ssh $wh docker cp sahara-wordpress_db_1:$dumpfile .
scp -rp $wh:~/$dumpfile .
echo "Done"
