#!/bin/sh
set -e

MINIO_ENABLED=${USER_MINIO:-"true"}
S3CMD_ENABLED=${S3CMD_ENABLED:-"false"}
S3_HOST=${S3_HOST:-"s3.fr-par.scw.cloud"}
S3_BUCKET=${S3_BUCKET:-"connect"}
S3_REGION=${S3_REGION:-"fr-par"}
S3_ACCESSKEY=${S3_ACCESSKEY:-"null"}
S3_SECRETKEY=${S3_SECRETKEY:-"null"}
SPINAL_ARCHIVE=${SPINAL_ARCHIVE:-"memory.tar.gz"}

if [ "$MINIO_ENABLED" == "true" ]; then
    echo "Dowloading archive using minio"
    mc alias set objstore "https://${S3_HOST}" "${S3_ACCESSKEY}" "${S3_SECRETKEY}" --api S3v4
    mc cp objstore/${S3_BUCKET}/${SPINAL_ARCHIVE} ${APP_PATH}/memory/
elif [ "$S3CMD_ENABLED" == "true" ]; then
    echo "Downloading archive using s3cmd"
cat <<EOF > ~/.s3cfg
[default]
# Object Storage Region "${S3_REGION}"
host_base = ${S3_HOST}
host_bucket = %{S3_BUCKET}.${S3_HOST}
bucket_location = ${S3_REGION}
use_https = True

# Login credentials
access_key = ${S3_ACCESSKEY}
secret_key = ${S3_SECRETKEY}
EOF
    s3cmd get s3://${S3_BUCKET}/${SPINAL_ARCHIVE} ${APP_PATH}/memory/
fi

cd ${APP_PATH}/memory/

echo "Extracting archive"
tar xvzfp ${SPINAL_ARCHIVE}

# echo "Updating permission"
# chown root:root ${APP_PATH}/memory/*
# chmod 777 ${APP_PATH}/memory/*

echo "Remove downloaded archive"
rm -vf ${SPINAL_ARCHIVE}

exec "$@"