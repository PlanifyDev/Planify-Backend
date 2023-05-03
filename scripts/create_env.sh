
touch .env

echo SALT_ROUND=${ secrets.SALT_ROUND } >> .env
echo JWT_SECRET=${ secrets.JWT_SECRET } >> .env
echo VERIFY_EMAIL=${ secrets.VERIFY_EMAIL } >> .env
echo VERIFY_PASSWORD=${ secrets.VERIFY_PASSWORD } >> .env
echo DATABASE_URI_LOCAL=${ secrets.DATABASE_URI_LOCAL } >> .env
echo ENV_DB=${ secrets.ENV_DB } >> .env
echo ENV_CACHE=${ secrets.ENV_CACHE } >> .env
echo REDIS_URL_LOCAL=${ secrets.REDIS_URL_LOCAL } >> .env
echo DATABASE_URL_PROD=${ secrets.DATABASE_URL_PROD } >> .env
echo FRONT_END_URL=${ secrets.FRONT_END_URL } >> .env 

echo "PAYPAL_ID=$PAYPAL_ID" >> .env
echo "PAYPAL_SECRET=$PAYPAL_SECRET" >> .env
echo "RETURN_URL=$RETURN_URL" >> .env
echo "CANCEL_URL=$CANCEL_URL" >> .env
echo "AUTH_GRPC_URL=$AUTH_GRPC_URL" >> .env

echo "AI_GRPC_URL=$AI_GRPC_URL" >> .env

echo "AUTH_LOG_PATH=$AUTH_LOG_PATH" >> .env
echo "PAY_LOG_PATH=$PAY_LOG_PATH" >> .env
echo "DESIGN_LOG_PATH=$DESIGN_LOG_PATH" >> .env
