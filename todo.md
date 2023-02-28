# todo

- use caching to save user after pass auth middleware
- use winston to logging

<!-- - req.socket.remoteAddress() -->

### auth

- google auth

### payment

- redirect to home page in front end after payment (success and cancel)
- get user data from auth service to send email to user after finish payment process
- generate new jwt for plan of user
  - has an expire date (month or year)
  - send it to user after payment
  - save it in cash
  - send it to user in any next login process
    <!-- - update `pay` endpoint to >> `/pay/<user_id>` -->
    <!-- - build payment by card (using strip) -->
