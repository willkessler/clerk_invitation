# Clerk Invitation React Apparent Bug

Minimal implementation to demonstrate bug in clerk react sdk


1. Set up a .env file with the keys shown in .env_sample.
1. To see the bug, sign in. Ideally, you have an organization already created with the account you sign in.
1. Invite a user
1. You will see that the invitations list is not updated. If you have
   the browser dev console open and click in the console and then
   click back, suddenly, *magic* the invitations list gets updated.

In other words, it appears as if the context does not tell the
application to rerender after the invitation is sent until focus is
lost and regained by the browser window.

The important code is in the src/components directory.
