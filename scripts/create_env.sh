# !/bin/bash

touch .env

echo SALT_ROUND=${SALT_ROUND} >> .envs
echo JWT_SECRET=${JWT_SECRET} >> .env
echo VERIFY_EMAIL=${VERIFY_EMAIL} >> .env
echo VERIFY_PASSWORD=${VERIFY_PASSWORD} >> .env
echo DATABASE_URI_LOCAL=${DATABASE_URI_LOCAL} >> .env
echo ENV_DB=${ENV_DB} >> .env
echo ENV_CACHE=${ENV_CACHE} >> .env
echo REDIS_URL_LOCAL=${REDIS_URL_LOCAL} >> .env
echo DATABASE_URL_PROD=${DATABASE_URL_PROD} >> .env
echo FRONT_END_URL=${FRONT_END_URL} >> .env 

# payment
echo PAYPAL_ID=${PAYPAL_ID} >> .env 
echo PAYPAL_SECRET=${PAYPAL_SECRET} >> .env
echo RETURN_URL=${RETURN_URL} >> .env
echo CANCEL_URL=${CANCEL_URL} >> .env
echo AUTH_GRPC_URL=${AUTH_GRPC_URL} >> .env

# design
echo AI_GRPC_URL=${AI_GRPC_URL} >> .env


# log path
echo AUTH_LOG_PATH=${ secrets.AUTH_LOG_PATH } >> .env 
echo PAY_LOG_PATH=${ secrets.PAY_LOG_PATH } >> .env 
echo DESIGN_LOG_PATH=${ secrets.DESIGN_LOG_PATH } >> .env 


