# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-02-12 16:00
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DnsRecord',
            fields=[
                ('id', models.IntegerField(editable=False, primary_key=True, serialize=False)),
                ('zone', models.CharField(help_text='Required. Defines the Name of the Zone', max_length=255, verbose_name='Zone Name')),
                ('ttl', models.IntegerField(help_text='Required. Setting for each DNS record that specifies how long a resolver is supposed to cache', verbose_name='Time To Live')),
                ('type', models.CharField(help_text='Required. Defines the type of the DNS record', max_length=255, verbose_name='Record Type')),
                ('host', models.CharField(default='@', help_text='Required.', max_length=255, verbose_name='Host name or IP address')),
                ('mx_priority', models.IntegerField(blank=True, help_text='Order in which the Servers are supposed to be contacted', null=True, verbose_name='MX Priority')),
                ('data', models.TextField(blank=True, help_text='IP address / Host name / Full domain name', max_length=255, null=True, verbose_name='Data')),
                ('primary_ns', models.CharField(blank=True, help_text='The primary name server for the domain', max_length=255, null=True, verbose_name='Primary Name Server')),
                ('resp_person', models.CharField(blank=True, help_text='Responsible person for SOA record', max_length=255, null=True, verbose_name='Responsible Person')),
                ('serial', models.BigIntegerField(blank=True, help_text='Serial number of the zone file is incremented each time a change is made.', null=True, verbose_name='Serial')),
                ('refresh', models.IntegerField(blank=True, help_text='Time in seconds that a secondary name server should wait between zone file update checks', null=True, verbose_name='Refresh Interval')),
                ('retry', models.IntegerField(blank=True, help_text='Time in seconds that a secondary name server should wait before trying to contact the primary name server again after a failed attempt to check for a zone file update.', null=True, verbose_name='Retry Interval')),
                ('expire', models.IntegerField(blank=True, help_text='Time in seconds that a secondary name server will treat its zone file as valid when the primary name server cannot be contacted. ', null=True, verbose_name='Expire Interval')),
                ('minimum', models.IntegerField(blank=True, help_text='Defines the time in seconds that any name server or resolver should cache a negative response.', null=True, verbose_name='Negative Caching Time To Live')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'dns_record',
            },
        ),
    ]