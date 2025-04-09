# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.3.7
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails app lives here
WORKDIR /app/railsServer

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  libsqlite3-dev \
  libyaml-dev \
  && rm -rf /var/lib/apt/lists/*

# Set production environment
#ENV RAILS_ENV="production" \
#    BUNDLE_DEPLOYMENT="1" \
#    BUNDLE_PATH="./railsServer/usr/local/bundle" \
#    BUNDLE_WITHOUT="development"

# Install application gems
COPY ./railsServer/Gemfile ./railsServer/Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

RUN chmod +x ./railsServer/bin/* && \
    sed -i "s/\r$//g" ./railsServer/bin/* && \
    sed -i 's/ruby\.exe$/ruby/' ./railsServer/bin/*

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 8083
CMD ["./railsServer/bin/thrust", "./railsServer/bin/rails", "server", "-b", "0.0.0.0", "-p", "8083"]
#CMD ["rails", "server", "-b", "0.0.0.0"]