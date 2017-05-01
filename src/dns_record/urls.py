from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from dns_record import views

urlpatterns = [
    url(_(r'domain/$'), views.DomainView.as_view(), name='domain'),
    url(_(r'records/(?P<domain>[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,})/$'), views.RecordView.as_view(), name='record'),
]
