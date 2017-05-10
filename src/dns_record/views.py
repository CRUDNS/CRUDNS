from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from dns_record.models import Domain, DnsRecord
from dns_record.serializers import DomainSerializer, RecordSerializer, DNSSerializer
from lib.utils import AtomicMixin


class DomainView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = DomainSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """
        List all Domains a user have
        """
        domains = Domain.objects.filter(user=self.request.user)
        serializer = DomainSerializer(domains, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Add a Domain
        """
        return self.create(request)


class RecordView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = RecordSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()

    def get(self, request, domain):
        """
        List all Domains a user have
        """
        domain_id = Domain.objects.get(domain=domain).id
        records = DnsRecord.objects.filter(domain=domain_id)
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Add a Domain
        """
        return self.create(request)

    def put(self, request):
        return self.update(request)

class RecordUpdate(AtomicMixin,UpdateModelMixin,GenericAPIView):
    serializer_class = RecordSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()

    def get(self, request, pk):
        """
        List all Domains a user have
        """
        records = DnsRecord.objects.get(pk=pk)
        serializer = RecordSerializer(records)
        return Response(serializer.data)

    def put(self, request,pk):
        return self.update(request)


class DNSRecordView(viewsets.ModelViewSet):
    queryset = DnsRecord.objects.all()
    serializer_class = DNSSerializer
    api_view(['GET', 'POST', 'PUT'])