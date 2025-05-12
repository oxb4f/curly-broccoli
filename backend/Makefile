DOCKER_REGISTRY ?= dev
DOCKER_USERNAME ?= oxb4f
APP_NAME ?= backend
GIT_BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT ?= $(shell git rev-parse --short HEAD)
DOCKER_TAG ?= ${GIT_BRANCH}-${GIT_COMMIT}
APP_IMAGE ?= ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:${DOCKER_TAG}
DOCKER_FILE ?= build/Dockerfile
DOCKER_COMPOSE ?= deployment/docker-compose.yml
ENV_FILE ?= .env.dev
PROFILE ?= dev ## Docker Compose profile to use

RN := $(shell echo $$(( RANDOM % 9 + 1 ))`seq -w 0 8 | shuf | tr -d '\n' | head -c 9`)
RS := $(shell openssl rand -base64 10 | tr -dc 'a-zA-Z0-9' | head -c 10)

# @target build
PULL ?= false ## Pull the latest base image before building. Default is false.
NO_CACHE ?= false ## Build the image without using cache. Default is false.
TARGET ?= run ## Build target

BLUE := \033[1;34m
GREEN := \033[0;32m
WHITE := \033[0;97m
RESET := \033[0m

.PHONY: build run stop help hurl test-unit test-env

env: ## Apply environment variables to the environment
	@if [ ! -f deployment/${ENV_FILE} ]; then \
		echo "$(RED)Error: deployment/${ENV_FILE} not found!$(RESET)"; \
		exit 1; \
	fi
	$(eval include deployment/${ENV_FILE})
	$(eval export $(shell sed 's/=.*//' deployment/${ENV_FILE}))

build: ## Build the Docker image for the application
ifeq ($(PULL),true)
	PULL_FLAG=--pull
else
	PULL_FLAG=
endif
ifeq ($(NO_CACHE),true)
	NO_CACHE_FLAG=--no-cache
else
	NO_CACHE_FLAG=
endif
	DOCKER_BUILDKIT=1 docker build $(PULL_FLAG) $(NO_CACHE_FLAG) --tag ${APP_IMAGE} --file ${DOCKER_FILE} --target ${TARGET} .

run: env stop ## Start the application using Docker Compose
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} $(if $(PROFILE),--profile $(PROFILE),) up -d

stop: env ## Stop the application using Docker Compose
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} down --volumes

hurl: ## Run hurl tests against the application
	@hurl \
		--variables-file ./test/hurl/vars \
		--variable rn=$(RN) \
		--variable rs=$(RS) \
		--file-root ./test/hurl/fixtures \
		--insecure \
		--error-format long \
		--test \
		--jobs 1 \
		--glob "./test/hurl/**/*.hurl"

test-unit: env stop ## Run unit tests against the application
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} up --detach && docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} exec --tty --interactive app sh -c "bun run test"

logs: env ## Display container last logs
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} logs --tail 100

logs-follow: env ## Display container last logs
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} logs --follow

dev: build ## Start the application in development mode
	$(MAKE) run PROFILE=dev
	$(MAKE) logs-follow

watch: env stop ## Start the application with Docker Compose watch
	APP_IMAGE=${APP_IMAGE} ENV_FILE=${ENV_FILE} docker compose --file ${DOCKER_COMPOSE} --project-name ${APP_NAME} --profile dev watch

help: ## Display this help message
	@echo "Usage: make [target] [FLAGS]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Flags:"
	@echo "  PROFILE=<profile>  Docker Compose profile to use (dev, db, elastic, storage, all)"
	@echo "  PULL=true          Pull the latest base image before building"
	@echo "  NO_CACHE=true      Build the image without using cache"
	@echo "  ENV_FILE=<file>    Environment file to use (default: .env.dev)"
