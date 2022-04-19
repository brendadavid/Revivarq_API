node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repos Revivarq'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/Revivarq/"'
        }

        stage('Clone Repos Revivarq Web e api'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://matheus.lima@www.tools.ages.pucrs.br/Revivarq/api.git /opt/docker/Revivarq/api"'
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://matheus.lima@www.tools.ages.pucrs.br/Revivarq/web.git /opt/docker/Revivarq/web"'
        }

        stage('Down Images DB, Api and Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Revivarq/api; docker-compose -f docker-compose-web.yml down; docker-compose -f docker-compose.yml down"'
        }

        stage('Pre Build Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Revivarq/api;sh ./ic.sh"'
        }

        stage('Build and Up Docker Image api and MongoDB'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Revivarq/api; docker-compose up --build -d"'
        }

        stage('Build and Up Docker Image Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Revivarq/api; docker-compose -f docker-compose-web.yml up --build -d"'
        }

        stage('Success'){
            mail body: 'project REVIVARQ build successful in HML',
                     from: 'jenkins@ages.com',
                     replyTo: 'cassio.trindade@pucrs.br, matheus.ferreira.001@acad.pucrs.br, joao.fantin@acad.pucrs.br, vinicius.branco@acad.pucrs.br',
                     subject: 'Success CI Revivarq',
                     to: 'cassio.trindade@pucrs.br, matheus.ferreira.001@acad.pucrs.br, joao.fantin@acad.pucrs.br, vinicius.branco@acad.pucrs.br'
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL} \n Error message: ${err.getMessage()} " ,
            from: 'jenkins@ages.com',
            replyTo: 'cassio.trindade@pucrs.br, matheus.ferreira.001@acad.pucrs.br, joao.fantin@acad.pucrs.br, vinicius.branco@acad.pucrs.br',
            subject: 'Error CI Revivarq',
            to: 'cassio.trindade@pucrs.br, matheus.ferreira.001@acad.pucrs.br, joao.fantin@acad.pucrs.br, vinicius.branco@acad.pucrs.br'

        throw err
    }

}