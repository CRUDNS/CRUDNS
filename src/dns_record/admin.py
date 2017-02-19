from django.contrib import admin
from .models import DnsRecord, Domain

admin.site.register(DnsRecord)
admin.site.register(Domain)
