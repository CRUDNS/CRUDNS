from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from dns_record import views
from rest_framework import routers
from .views import DNSRecordView, DomainsView

router = routers.DefaultRouter()
router.register(r'dns', DNSRecordView)
router.register(r'domains', DomainsView)

urlpatterns = [
    url(_(r'domain/$'), views.DomainView.as_view(), name='domain'),
    url(_(r'records/edit/(?P<pk>[0-9])/$'), views.RecordUpdate.as_view(), name='record-edit'),
    url(_(r'records/(?P<domain>[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,})/$'), views.RecordView.as_view(),
        name='record'),
    url(_(r'records/add/$'), views.RecordView.as_view(), name='record-add'),

]
urlpatterns += router.urls
