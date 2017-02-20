from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from dns_record import views

urlpatterns = [
    url(_(r'domain/$'), views.DomainView.as_view(), name='domain'),
]
