from rest_framework import serializers
from django_rest_logger import log

from dns_record.models import Domain, DnsRecord


class DomainSerializer(serializers.ModelSerializer):

    class Meta:
        model = Domain

    def create(self, validated_data):
        """
        Create the Domain Object
        :param validated_data:
        """

        domain = Domain.objects.create(domain=validated_data['domain'], user=validated_data['user'], status=False)
        domain.save()
        return domain

    def update(self, instance, validated_data):
        pass


class RecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = DnsRecord

    def create(self, validated_data):
        """
        Create the DNSRecord Object
        :param validated_data:
        """

        record = DnsRecord.objects.create(**validated_data['domain'])
        record.save()
        return domain