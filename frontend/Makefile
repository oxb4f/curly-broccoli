DOCKER_REGISTRY ?= dev
DOCKER_USERNAME ?= artdain
APP_NAME ?= frontend
GIT_BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT ?= $(shell git rev-parse --short HEAD)
DOCKER_TAG ?= ${GIT_BRANCH}-${GIT_COMMIT}
APP_IMAGE ?= ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:${DOCKER_TAG}
DOCKER_FILE ?= ./docker/Dockerfile
DOCKER_COMPOSE ?= ./docker/docker-compose.yml
DOCKER_COMPOSE_DEV ?= ./docker/docker-compose.dev.yml
DOCKER_COMPOSE_PROD ?= ./docker/docker-compose.prod.yml

build: ## Build the Docker image for the application
	docker build --tag ${APP_IMAGE} --file ${DOCKER_FILE} --target ${TARGET} .

run: ## Start the application using Docker Compose
	APP_IMAGE=${APP_IMAGE} docker compose --project-directory . --file ${DOCKER_COMPOSE} --file ${DOCKER_COMPOSE_DEV} --project-name ${APP_NAME} --profile ${PROFILE} up --watch

dev: TARGET=run 
dev: PROFILE=dev 
dev: build run

prod: TARGET=preview
prod: PROFILE=prod
prod: build
		APP_IMAGE=${APP_IMAGE} docker compose --project-directory . --file ${DOCKER_COMPOSE} --file ${DOCKER_COMPOSE_PROD} --project-name ${APP_NAME} --profile ${PROFILE} up -d
	