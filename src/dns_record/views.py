from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from knox.auth import TokenAuthentication
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from dns_record.models import Domain, DnsRecord
from dns_record.serializers import DomainSerializer, RecordSerializer, DNSSerializer, DomainsSerializer
from lib.utils import AtomicMixin, CSRFExemptMixin, CsrfExemptSessionAuthentication


class DomainView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = DomainSerializer
    queryset = DnsRecord.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        """List all Domains a user have."""
        if self.request.query_params.get('pk'):
            domains = Domain.objects.filter(id=self.request.query_params.get('pk'))
        else:
            domains = Domain.objects.filter(Q(user=self.request.user) |
                                            Q(collaborator__username__contains=self.request.user.username)).distinct()
        serializer = DomainSerializer(domains, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Add a Domain."""
        return self.create(request)


class RecordView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = RecordSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()

    def get(self, request, domain):
        """List all Domains a user have."""
        domain_id = Domain.objects.get(domain=domain).id
        records = DnsRecord.objects.filter(domain=domain_id)
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Add a Domain."""
        return self.create(request)

    def put(self, request):
        """Update a Domain."""
        return self.update(request)


@method_decorator(csrf_exempt, name='dispatch')
class RecordUpdate(AtomicMixin, UpdateModelMixin, GenericAPIView):
    serializer_class = RecordSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()

    def get(self, request, pk):
        """List all Domains a user have."""
        records = DnsRecord.objects.get(pk=pk)
        serializer = RecordSerializer(records)
        return Response(serializer.data)

    def put(self, request, pk):
        """Update a Record."""
        return self.update(request)


class DNSRecordView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()
    serializer_class = DNSSerializer
    api_view(['GET', 'POST', 'PUT'])


class DomainsView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication, CSRFExemptMixin)
    permission_classes = (IsAuthenticated,)
    queryset = Domain.objects.all()
    serializer_class = DomainsSerializer
    api_view(['GET', 'POST', 'PUT', 'PATCH'])


class RecordssView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication, CSRFExemptMixin)
    permission_classes = (IsAuthenticated,)
    queryset = DnsRecord.objects.all()
    serializer_class = RecordSerializer
    api_view(['GET', 'POST', 'PUT', 'PATCH'])
