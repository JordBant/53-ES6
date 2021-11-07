Form Capabilities
--------------------

Email
--------------
- Must check if email is valid syntax
- Must check if email exists

Passwords
----------
- Should be able to compare #password and #confirm to see if the passwords match
- Password is only accepted if it meets the criteria of containing: 
    * (* ? / \ & % @ # ! _)
    * All Numbers 
    * All letters
    * One capital letter
    * 8-10 Characters 
- Should store password in a secure database
- Password text area will reset in the error state or upon refreshing of the page


Username
------------
- If a username exists then the person may not use that username

Phone Number
-----------
- Must check if it is a valid or active phone number

(All areas will have various states and will all be required to have valid input)