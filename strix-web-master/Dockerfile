FROM nginx:1

ENV CLIENT_KEY="client"
ENV CLIENT_SECRET="secret"
ENV BASE_URL="http://localhost"
ENV GOOGLE_ANALYTICS_TRACK_ID="google_analytics_track_id"
ENV GOOGLE_TAG_MANAGER_ID="google_tag_manager_id"

EXPOSE 80

COPY ./out/ /usr/share/nginx/html
COPY ./env.template /usr/share/nginx/html/env.template

COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD /bin/bash -c "envsubst < /usr/share/nginx/html/env.template > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"
