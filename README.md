# backend-platform
SINGLE: npm i

- [ ] serve - run overloop server
- [ ] runtime - run nodemon

DOCKER:
- [ ] docker build . -t workshop/app-server
- [ ] docker run --name app-server -p 127.0.0.1:81:8000 -d workshop/app-server