# jwt-authentication

API application created with Addison **api** application template.

For more information:
* [Addison Command Line Interface](https://github.hpe.com/global-it-addison/addison-cli)
* [Addison application templates](https://github.hpe.com/global-it-addison/generator-addison)

## Running locally

To develop this project locally, add a `.env` file to the root of your project with the following content:

```
ADDISON_HOST=0.0.0.0
ADDISON_PORT=8443
NODE_PATH=.
```

You'll also want to create an `ssl` folder in the application root that contains localhost `server.crt` and `server.key` files. Run the following commands from your application root folder to do this (use [Git Bash](https://git-scm.com/download/win) or [Cygwin](https://cygwin.com/install.html) in Windows):

```sh
mkdir ssl && cd ssl
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "//C=US\ST=California\L=Palo Alto\O=Hewlett Packard Enterprise Company\OU=Servers\CN=localhost"
openssl x509 -req -days 1024 -in server.csr -signkey server.key -out server.crt
rm server.csr
```

Use the following for non-Windows systems: `"/C=US/ST=California/L=Palo Alto/O=Hewlett Packard Enterprise Company/OU=Servers/CN=localhost"`


Vault


Refer: https://www.vaultproject.io/intro/getting-started/apis.html


Note: Keys should be saved somewhere for dev ENV

1. Create a file in root - vault-config.hcl

    ```
    Add the following lines  -
    backend "file" {
      path = "vault"
    }

    listener "tcp" {
      tls_disable = 1
    }
    ```

2. Run the vault server
    ```
    vault server -config=config.hcl
    ```

3. Init vault

    ```
    curl \
    --request POST \
    --data '{"secret_shares": 1, "secret_threshold": 1}' \
    http://127.0.0.1:8200/v1/sys/init
    ```

4. From the above command, Save the response which contains keys and root_token

5. Save the root token in env file, vaultToken = token


