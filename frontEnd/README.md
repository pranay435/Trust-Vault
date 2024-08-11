[![codecov](https://codecov.io/gh/GLVSKiriti/TrustVaultFrontend/graph/badge.svg?token=4MKJFLRVZA)](https://codecov.io/gh/GLVSKiriti/TrustVaultFrontend)

# TrustVault

TrustVault is a web-based platform that allows users to store and share sensitive data,
such as financial information and personal messages, with nominated individuals.
The platform continuously monitors the status of the user and, upon reaching a predetermined threshold,
automatically delivers the stored data to the nominated individuals.

# Features:

- Robust Routing mechanism ensures the users with a secure and convenient way to store and share sensitive data with trusted individuals.
- To give users peace of mind by automating the process of sharing important information in the event of an emergency or unforeseen circumstance.
- Users will sign up for a TrustVault account and create a profile.
- They will then be able to upload and store data on the platform, including financial information, personal messages, and other important documents.
- Users can also attach nominated individuals to their stored data, specifying who should receive the information in the event of an emergency.
- The platform will continuously monitor the status of the user and, upon reaching the predetermined threshold, automatically deliver the stored data to the nominated individuals.

# Repositories

Frontend: [TrustVault](https://github.com/GLVSKiriti/TrustVaultFrontend)

Backend: [TrustVault](https://github.com/GLVSKiriti/TrustVault)

# `Backend`

## Routes

- `/auth/sign and /auth/signup`: For signIn and signUp
- `/vault/getAllVaults`: To get all Vaults data of a particular user
- `/vault/addVault`: To add a new Vault\
  `Note`: Here Vault data is encrypted using vault_secret_key and this vault_secret_key is not stored in database\
  so that only user and nominees(after user inactive status) can only access the vault data. Neither website owner nor the \
  person who has access to the database dont know the vault_secret_key so cant access the vault data
- `/vault/displayVault` and `/vault/UpdateVault/:vId` : To display and update Vault details (User should enter Vault_Secret_Key to do this operations)
- `/vault/deleteVault/:vId` : To delete a vault (User Should Enter Password of Trust Vault account to delete)
- `/cron/statusCheck` : This Route checks the status of each user based on their last login time\
  In Phase1 check it sends a email to remind user to login once if it crosees 7 days if it crosses 14 days then it runs Phase2 check\
  In which it sends one more warning mail for a week and if user still not logging in,Then it sends the all vault data of that user \
  to respective nominees
- `/nominee/email` : Which sends a OTP to the entered nominee email
- `/nominee/otpVerify` : To verify OTP entered and if correct it sends description about the Vault_Secret_Key of the respective vault
- `/nominee/vaultData` : It entered Vault_Secret_Key is correct then it displays Vault data
  `Note`: Based on the description given by user nominee should enter the key

# `Frontend`

- These are Frontend UI of few pages
- If you want to see all pages [Frontend UI](https://github.com/GLVSKiriti/TrustVaultFrontend/tree/main/ImagesForReadme)

<img src="https://github.com/GLVSKiriti/TrustVaultFrontend/blob/main/ImagesForReadme/loginPage.png">

<img src="https://github.com/GLVSKiriti/TrustVaultFrontend/blob/main/ImagesForReadme/GetAllVaultsPage.png" >

<img src="https://github.com/GLVSKiriti/TrustVaultFrontend/blob/main/ImagesForReadme/addVaultPage.png">

<img src="https://github.com/GLVSKiriti/TrustVaultFrontend/blob/main/ImagesForReadme/NomOTP.png">

<img src="https://github.com/GLVSKiriti/TrustVaultFrontend/blob/main/ImagesForReadme/UserPhase2verification.png">

## `Future Tasks`

- To make the Appliation portable such that user can also upload documents,audio,videos,images etc..

  - Both Backend and Frontend should be devloped for this feature

- To make website more responsive to all type of devices
- To Devlop Authentication

  - To link google authentication
  - to check wheteher email really exists or not
  - Forgot password feature

- And to make the otp verification of the nominee through mobile number instead of email

## TechStacks

- ReactJs
- ExpressJS
- NodeJs
- PostgreSQL

packages like

- node-cron (To do cron-jobs)
- nodemailer (To send mails)
- crypto-js (To encrypt and decrypt vault data)
- bcrypt (For password hashing)
