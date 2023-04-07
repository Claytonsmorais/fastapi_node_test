FROM ubuntu:latest
WORKDIR /opt/app
USER root
RUN apt update \
    && apt install --assume-yes python3.10 \
    && apt install --assume-yes python3-pip \
    && apt install --assume-yes python3.10-venv

RUN apt install --assume-yes curl

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash && apt install -y nodejs

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN ["npm","install"]
ENV VIRTUAL_ENV=/opt/app/venv
RUN python3.10 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
EXPOSE 8000
RUN ["pip3","install","-r","requirements.txt"]
CMD ["python3.10","main.py"]




