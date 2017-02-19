from rest_framework import serializers
from django_rest_logger import log

from dns_record.models import Domain


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