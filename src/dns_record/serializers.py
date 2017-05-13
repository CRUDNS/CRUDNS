from rest_framework import serializers
from accounts import serializers as acc


from dns_record.models import Domain, DnsRecord


class DomainSerializer(serializers.ModelSerializer):
    collaborator = acc.UserSerializer(many=True)
    user = acc.UserSerializer()

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
        validated_data['domain'] = Domain.objects.get(domain=validated_data['domain']).id

        record = DnsRecord.objects.create(**validated_data)
        record.save()
        return record

    def update(self, instance, validated_data):

        instance.zone = validated_data.get('zone', instance.zone)
        instance.ttl = validated_data.get('ttl', instance.ttl)
        instance.type = validated_data.get('type', instance.type)
        instance.host = validated_data.get('host', instance.host)
        instance.mx_priority = validated_data.get('mx_priority', instance.mx_priority)
        instance.data = validated_data.get('data', instance.data)
        instance.primary_ns = validated_data.get('primary_ns', instance.primary_ns)
        instance.resp_person = validated_data.get('resp_person', instance.resp_person)
        instance.serial = validated_data.get('serial', instance.serial)
        instance.refresh = validated_data.get('refresh', instance.refresh)
        instance.retry = validated_data.get('retry', instance.retry)
        instance.minimum = validated_data.get('minimum', instance.minimum)
        instance.expire = validated_data.get('expire', instance.expire)
        instance.save()

        return instance


class DNSSerializer(serializers.ModelSerializer):
    domain = serializers.SlugRelatedField(
        slug_field='domain',
        queryset=Domain.objects.all()
    )

    class Meta:
        model = DnsRecord