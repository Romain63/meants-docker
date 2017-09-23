FROM nginx
ENV VIRTUAL_HOST mars.modisfrance.fr
COPY dist /usr/share/nginx/html
COPY ci/default.conf /etc/nginx/conf.d/default.conf