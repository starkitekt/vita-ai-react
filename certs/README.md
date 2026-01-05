# SSL Certificates Directory

This directory should contain SSL/TLS certificates for production HTTPS.

## Required Files

- `fullchain.pem` - Full certificate chain (certificate + intermediates)
- `privkey.pem` - Private key

## For Development/Testing

Generate self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout privkey.pem \
    -out fullchain.pem \
    -subj "/CN=localhost"
```

## For Production

Use Let's Encrypt or another trusted CA:

```bash
# Using certbot
certbot certonly --standalone -d yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./
```

## Security Notes

- ⚠️ Never commit private keys to git
- The `.gitignore` should include `*.pem` files
- Set permissions: `chmod 600 privkey.pem`
