# !/bin/bash

touch .env

echo SALT_ROUND=${{ secrets.SALT_ROUND }} >> .envs
echo JWT_SECRET=${{ secrets.JWT_SECRET }} >> .env
echo VERIFY_EMAIL=${{ secrets.VERIFY_EMAIL }} >> .env
echo VERIFY_PASSWORD=${{ secrets.VERIFY_PASSWORD }} >> .env
echo DATABASE_URI_LOCAL=${{ secrets.DATABASE_URI_LOCAL }} >> .env
echo ENV_DB=${{ secrets.ENV_DB }} >> .env
echo ENV_CACHE=${{ secrets.ENV_CACHE }} >> .env
echo REDIS_URL_LOCAL=${{ secrets.REDIS_URL_LOCAL }} >> .env
echo FRONT_END_URL=${{ secrets.FRONT_END_URL }} >> .env 

# payment
echo PAYPAL_ID=${{ secrets.PAYPAL_ID }} >> .env 
echo PAYPAL_SECRET=${{ secrets.PAYPAL_SECRET }} >> .env
echo RETURN_URL=${{ secrets.RETURN_URL }} >> .env
echo CANCEL_URL=${{ secrets.CANCEL_URL }} >> .env
echo AUTH_GRPC_URL=${{ secrets.AUTH_GRPC_URL }} >> .env

# design
echo AI_GRPC_URL=${{ secrets.AI_GRPC_URL }} >> .env


# log path
echo AUTH_LOG_PATH=${{ secrets.AUTH_LOG_PATH }} >> .env 
echo PAY_LOG_PATH=${{ secrets.PAY_LOG_PATH }} >> .env 
echo DESIGN_LOG_PATH=${{ secrets.DESIGN_LOG_PATH }} >> .env 


