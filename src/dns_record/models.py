from django.db import models
from django.utils.translation import ugettext_lazy as _


class DnsRecord(models.Model):
    """Model that represents a DNS Record."""

    id = models.AutoField(primary_key=True)
    zone = models.CharField(
        _('Zone Name'),
        max_length=255,
        help_text=_('Required. Defines the Name of the Zone')
    )

    ttl = models.IntegerField(
        _('Time To Live'),
        help_text=_('Required. Setting for each DNS record that specifies how long a resolver is supposed to cache')
    )

    type = models.CharField(
        _('Record Type'),
        max_length=255,
        help_text=_('Required. Defines the type of the DNS record')
    )

    host = models.CharField(
        _('Host name or IP address'),
        help_text=_('Required.'),
        default='@',
        max_length=255
    )

    mx_priority = models.IntegerField(
        _('MX Priority'),
        help_text=_('Order in which the Servers are supposed to be contacted'),
        null=True,
        blank=True,
        default=None
    )

    data = models.TextField(
        _('Data'),
        help_text=_('IP address / Host name / Full domain name'),
        max_length=255,
        null=True,
        blank=True,
        default=None
    )

    primary_ns = models.CharField(
        _('Primary Name Server'),
        help_text=_('The primary name server for the domain'),
        max_length=255,
        null=True,
        blank=True,
        default=None
    )

    resp_person = models.CharField(
        _('Responsible Person'),
        help_text=_('Responsible person for SOA record'),
        max_length=255,
        null=True,
        blank=True,
        default=None
    )

    serial = models.BigIntegerField(
        _('Serial'),
        help_text=_('Serial number of the zone file is incremented each time a change is made.'),
        null=True,
        blank=True,
        default=None
    )

    refresh = models.IntegerField(
        _('Refresh Interval'),
        help_text=_('Time in seconds that a secondary name server should wait between zone file update checks'),
        null=True,
        blank=True,
        default=None
    )

    retry = models.IntegerField(
        _('Retry Interval'),
        help_text=_('Time in seconds that a secondary name server should wait before trying to contact the primary '
                    'name server again after a failed attempt to check for a zone file update.'),
        null=True,
        blank=True,
        default=None
    )

    expire = models.IntegerField(
        _('Expire Interval'),
        help_text=_('Time in seconds that a secondary name server will treat its zone file as valid when'
                    ' the primary name server cannot be contacted. '),
        null=True,
        blank=True,
        default=None
    )

    minimum = models.IntegerField(
        _('Negative Caching Time To Live'),
        help_text=_('Defines the time in seconds that any name server or resolver should cache a negative response.'),
        null=True,
        blank=True,
        default=None
    )

    domain = models.ForeignKey(
        'Domain',
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'dns_record'

    def __str__(self):
        """
        Unicode representation for an dns_record record model.

        :return: string
        """
        return self.zone + '\t' + str(self.ttl) + '\t' + self.type + '\t' + self.host


class Domain(models.Model):
    """Model that represent a domain that owned by a User."""

    domain = models.CharField(
        _('Domain Name'),
        help_text=_('Required. Domain Name'),
        max_length=255,
    )

    status = models.BooleanField(
        _('Status of the Domain'),
        help_text=_('Whether Domains NS record points to our NS'),
        default=False,
        blank=True
    )

    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        blank=True
    )

    collaborator = models.ManyToManyField(
        'accounts.User',
        blank=True,
        related_name='collaborator',
        null=True
    )

    def __str__(self):
        """Unicode representation for an dns_record Domain model.

        :return: string
        """
        return self.domain
