# todo

- use caching to save user after pass auth middleware
- use winston to logging

<!-- - req.socket.remoteAddress() -->

### auth

- google auth
  <!-- - build forget password endpoint -->
  <!-- - verifyHandler error Cannot set headers after they are sent to the client -->

### payment

- edit update payment function after executed (update payment status to `ok`)
- redirect to home page in front end after payment (success and cancel)
- get user data from auth service to send email to user after finish payment process
- edit error handler
- generate new jwt for plan of user
  - has expire date
  - send it to user after payment
  - save it in cash
  - send it to user in any next login process

<!-- - build payment by card (using strip) -->
