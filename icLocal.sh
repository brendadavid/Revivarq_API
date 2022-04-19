echo "Delete Repos Revivarq"
rm -rf /opt/docker/Revivarq/

echo "Clone Repos Revivarq Web e api"
git clone --depth 1 --branch homo http://matheus.lima@www.tools.ages.pucrs.br/Revivarq/api.git /opt/docker/Revivarq/api
git clone --depth 1 --branch homo http://matheus.lima@www.tools.ages.pucrs.br/Revivarq/web.git /opt/docker/Revivarq/web

echo "Down Images DB, Api and Web"
cd /opt/docker/Revivarq/api
docker-compose -f docker-compose-web.yml down
docker-compose -f docker-compose.yml down

echo "Pre Build Web"
cd /opt/docker/Revivarq/api
sh ./ic.sh

echo "Build and Up Docker Image api and MongoDB"
cd /opt/docker/Revivarq/api
 docker-compose up --build -d

echo "Build and Up Docker Image Web"
cd /opt/docker/Revivarq/api;
docker-compose -f docker-compose-web.yml up --build -d
