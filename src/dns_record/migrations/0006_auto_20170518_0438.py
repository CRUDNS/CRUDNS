# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-18 04:38
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dns_record', '0005_domain_collaborator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='domain',
            name='collaborator',
            field=models.ManyToManyField(blank=True, null=True, related_name='collaborator', to=settings.AUTH_USER_MODEL),
        ),
    ]
