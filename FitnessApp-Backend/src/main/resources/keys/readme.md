Important Commands

#####Generate Private Key    
openssl genrsa -out rsa_1024_priv.pem 1024

#####Generate Public Key    

openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem

#####Generate PKCS[JAVA SUPPORTED] Private Key    
openssl pkcs8 -topk8 -inform PEM -outform DER -in rsa_1024_priv.pem  -nocrypt > rsa_1024_priv_pkcs8

#####Generate PKCS[JAVA SUPPORTED] Public Key    
openssl rsa -in rsa_1024_priv.pem -pubout -outform DER -out rsa_1024_pub_der
