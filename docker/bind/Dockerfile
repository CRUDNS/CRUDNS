FROM ubuntu:14.04
MAINTAINER Prabod Rathnayaka <prabod@rathnayaka.me>

COPY ./docker/bind/bind-entrypoint.sh /

WORKDIR /bind
RUN apt-get update && apt-get -y install bind9
RUN apt-get -y install bind9utils
RUN apt-get -y remove bind9
RUN apt-get -y build-dep bind9
RUN mkdir bind9
RUN cd bind9
RUN apt-get source bind9
RUN apt-get install -y libpq-dev && apt-get install -y unixodbc unixodbc-dev
RUN cd bind9-9.9.5.dfsg/
RUN ls
RUN ./bind9-9.9.5.dfsg/configure --prefix=/usr --sysconfdir=/etc/bind --localstatedir=/var \
--mandir=/usr/share/man --infodir=/usr/share/info \
--enable-threads --enable-largefile --with-libtool --enable-shared --enable-static \
--with-openssl=/usr --with-gssapi=/usr --with-gnu-ld \
--with-dlz-postgres=yes --with-dlz-bdb=no \
--with-dlz-filesystem=yes --with-dlz-ldap=yes \
--with-dlz-stub=yes --with-geoip=/usr --enable-ipv6

RUN make
RUN make install

COPY ./docker/bind/named.conf /etc/bind/named.conf